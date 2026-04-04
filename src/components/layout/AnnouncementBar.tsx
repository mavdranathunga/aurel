'use client';

import styles from './AnnouncementBar.module.css';

export default function AnnouncementBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <div className={styles.content}>
          <span>FREE SHIPPING ON ORDERS OVER $150</span>
          <span className={styles.dot}>✦</span>
          <span>NEW COLLECTION NOW AVAILABLE</span>
          <span className={styles.dot}>✦</span>
          <span>COMPLIMENTARY GIFT WRAPPING</span>
          <span className={styles.dot}>✦</span>
          <span>FREE SHIPPING ON ORDERS OVER $150</span>
          <span className={styles.dot}>✦</span>
          <span>NEW COLLECTION NOW AVAILABLE</span>
          <span className={styles.dot}>✦</span>
          <span>COMPLIMENTARY GIFT WRAPPING</span>
          <span className={styles.dot}>✦</span>
        </div>
      </div>
    </div>
  );
}
