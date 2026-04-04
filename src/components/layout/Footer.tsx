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
              <a href="#" className="btn-icon" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="btn-icon" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="btn-icon" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
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
