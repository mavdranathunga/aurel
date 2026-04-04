'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section className={styles.hero} id="hero-section">
      <div className={styles.bgOverlay} />
      <div className={styles.grain} />

      {/* Decorative elements */}
      <div className={styles.verticalLine} />
      <div className={styles.cornerBorder} />

      <div className={`container ${styles.content} ${loaded ? styles.loaded : ''}`}>
        <div className={styles.labelRow}>
          <div className={styles.line} />
          <span className={styles.label}>SS &apos;26 COLLECTION</span>
          <div className={styles.line} />
        </div>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>Redefine</span>
          <span className={`${styles.titleLine} ${styles.italic}`}>Your Elegance</span>
        </h1>

        <p className={styles.subtitle}>
          Timeless sophistication meets modern design. Discover our curated collection
          of premium clothing crafted for the contemporary connoisseur.
        </p>

        <div className={styles.actions}>
          <Link href="/shop" className="btn btn-primary" id="hero-shop-btn">
            Explore Collection
            <ArrowRight size={16} />
          </Link>
          <Link href="/about" className="btn btn-ghost" id="hero-story-btn">
            Our Story
          </Link>
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statValue}>150+</span>
            <span className={styles.statLabel}>Curated Pieces</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>12</span>
            <span className={styles.statLabel}>Countries</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statValue}>50K+</span>
            <span className={styles.statLabel}>Happy Clients</span>
          </div>
        </div>
      </div>

      <button
        className={styles.scrollIndicator}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        aria-label="Scroll down"
      >
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
