import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>AUREL</Link>
            <p className={styles.tagline}>Redefine Your Elegance</p>
            <p className={styles.description}>
              Premium clothing and accessories crafted for those who appreciate timeless sophistication and exceptional quality.
            </p>
            <div className={styles.social}>
              <a href="https://instagram.com/aurel" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://facebook.com/aurel" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://wa.me/94715626057" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> 
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Shop</h4>
            <Link href="/shop" className={styles.link}>All Products</Link>
            <Link href="/collections" className={styles.link}>Collections</Link>
            <Link href="/shop?category=men" className={styles.link}>Men</Link>
            <Link href="/shop?category=women" className={styles.link}>Women</Link>
            <Link href="/shop?category=accessories" className={styles.link}>Accessories</Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Company</h4>
            <Link href="/about" className={styles.link}>Our Story</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
            <a href="#" className={styles.link}>Careers</a>
            <a href="#" className={styles.link}>Sustainability</a>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Help</h4>
            <a href="#" className={styles.link}>Shipping & Returns</a>
            <a href="#" className={styles.link}>Size Guide</a>
            <a href="#" className={styles.link}>FAQ</a>
            <a href="#" className={styles.link}>Privacy Policy</a>
            <a href="#" className={styles.link}>Terms of Service</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} AUREL. All rights reserved.</p>
          <div className={styles.payments}>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
