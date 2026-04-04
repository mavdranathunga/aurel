'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight, TrendingUp, ShoppingBag } from 'lucide-react';
import { products } from '@/data/products';
import Link from 'next/link';
import styles from './SearchOverlay.module.css';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = ['Shirts', 'Dresses', 'Accessories', 'Sale'];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(0, 3);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      if (finalQuery.toLowerCase() === 'sale') {
        router.push('/shop?category=offers');
      } else {
        router.push(`/shop?search=${encodeURIComponent(finalQuery.trim())}`);
      }
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.dropdown} ref={containerRef}>
      <div className={styles.header}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          {query && (
            <button onClick={() => setQuery('')} className={styles.clearBtn}>
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Trending Now</h3>
          <div className={styles.tags}>
            {trendingSearches.map(tag => (
              <button 
                key={tag} 
                className={styles.tag}
                onClick={() => handleSearch(tag)}
              >
                <Search size={12} />
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Popular Products</h3>
          <div className={styles.productList}>
            {filteredProducts.map(product => (
              <Link 
                key={product.id} 
                href={`/product/${product.slug}`} 
                className={styles.productItem}
                onClick={onClose}
              >
                <div className={styles.productImage}>
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productPrice}>Rs {product.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
            {filteredProducts.length === 0 && (
              <p className={styles.noResults}>No matches found</p>
            )}
          </div>
        </div>

        {query && filteredProducts.length > 0 && (
          <button className={styles.viewAll} onClick={() => handleSearch()}>
            View all results
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
