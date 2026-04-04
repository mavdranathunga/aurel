import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { collections } from '@/data/collections';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Metadata } from 'next';
import styles from './collections.module.css';

export const metadata: Metadata = {
  title: 'Collections — AUREL',
  description: 'Explore our curated collections of premium clothing and accessories for men, women, and more.',
};

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #2d1b2e 0%, #3d1f3d 50%, #4a1942 100%)',
  'linear-gradient(135deg, #1a1a0e 0%, #2d2b1e 50%, #3d3520 100%)',
  'linear-gradient(135deg, #0e1a1a 0%, #1e2d2b 50%, #203d35 100%)',
  'linear-gradient(135deg, #1a0e0e 0%, #2d1e1e 50%, #3d2020 100%)',
];

export default function CollectionsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.hero}>
          <ScrollReveal>
            <span className="label">Browse</span>
            <h1 className="heading-display" style={{ marginTop: 'var(--space-md)' }}>Collections</h1>
            <p className={styles.heroText}>
              Explore our thoughtfully curated collections, each designed to bring you the finest
              in contemporary fashion.
            </p>
          </ScrollReveal>
        </div>

        <div className={styles.grid}>
          {collections.map((col, i) => (
            <ScrollReveal key={col.id} delay={i * 100}>
              <Link href="/shop" className={styles.card}>
                <div className={styles.cardBg} style={{ background: gradients[i % gradients.length] }} />
                <div className={styles.imageOverlay} />
                <img src={col.image} alt={col.name} className={styles.cardImage} />
                
                <div className={styles.cardContent}>
                  <span className={styles.cardCount}>{col.productCount} pieces</span>
                  <h2 className={styles.cardTitle}>{col.name}</h2>
                  <p className={styles.cardDesc}>{col.description}</p>
                  <div className={styles.cardAction}>
                    <span>Explore Collection</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
