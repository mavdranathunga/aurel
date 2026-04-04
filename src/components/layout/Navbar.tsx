'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShoppingBag, Heart, Search, Menu, X, Sun, Moon } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from 'next-themes';
import Megamenu from './Megamenu';
import styles from './Navbar.module.css';
import SearchOverlay from './SearchOverlay';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop', hasMenu: true, type: 'shop' as const },
  { label: 'Collections', href: '/collections', hasMenu: true, type: 'collections' as const },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<'shop' | 'collections' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 50 && searchOpen) setSearchOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchOpen]);

  useEffect(() => {
    if (mobileOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen, searchOpen]);

  const handleMouseEnter = (type?: 'shop' | 'collections') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredMenu(type || null);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  return (
    <>
      <header 
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${hoveredMenu ? styles.menuOpen : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`container ${styles.inner}`}>
          <button
            className={`${styles.menuBtn} btn-icon`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            id="mobile-menu-toggle"
          >
            <Menu size={22} />
          </button>

          <Link href="/" className={styles.logo} id="navbar-logo">
            AUREL
          </Link>

          <nav className={styles.nav} id="main-navigation">
            {navLinks.map(link => (
              <div 
                key={link.href} 
                className={styles.navItem}
                onMouseEnter={() => handleMouseEnter(link.hasMenu ? link.type : undefined)}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.searchWrapper}>
              <button 
                className="btn-icon" 
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search" 
                id="nav-search"
              >
                <Search size={20} />
              </button>
              <SearchOverlay 
                isOpen={searchOpen} 
                onClose={() => setSearchOpen(false)} 
              />
            </div>
            
            {mounted && (
              <button
                className="btn-icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            )}

            <Link href="/wishlist" className={`btn-icon ${styles.iconWithBadge}`} aria-label="Wishlist" id="nav-wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && <span className={styles.badge}>{wishlistCount}</span>}
            </Link>
            <Link href="/cart" className={`btn-icon ${styles.iconWithBadge}`} aria-label="Cart" id="nav-cart">
              <ShoppingBag size={20} />
              {itemCount > 0 && <span className={styles.badge}>{itemCount}</span>}
            </Link>
          </div>
        </div>

        {hoveredMenu && (
          <Megamenu 
            type={hoveredMenu} 
            onClose={() => setHoveredMenu(null)} 
          />
        )}
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileOverlay} ${mobileOpen ? styles.open : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`} id="mobile-menu">
        <div className={styles.mobileHeader}>
          <span className={styles.mobileLogo}>AUREL</span>
          <button className="btn-icon" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className={styles.mobileNav}>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMobileOpen(false)}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.mobileFooter}>
          <Link href="/cart" className="btn btn-primary" onClick={() => setMobileOpen(false)} style={{ width: '100%' }}>
            <ShoppingBag size={16} />
            Cart {itemCount > 0 && `(${itemCount})`}
          </Link>
        </div>
      </div>
    </>
  );
}
