import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './FeaturedCollections.module.css';

const collections = [
  {
    title: "Men's",
    subtitle: 'Refined Essentials',
    href: '/shop?category=men',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  },
  {
    title: "Women's",
    subtitle: 'Modern Elegance',
    href: '/shop?category=women',
    gradient: 'linear-gradient(135deg, #2d1b2e 0%, #3d1f3d 50%, #4a1942 100%)',
  },
  {
    title: 'Accessories',
    subtitle: 'Finishing Touches',
    href: '/shop?category=accessories',
    gradient: 'linear-gradient(135deg, #1a1a0e 0%, #2d2b1e 50%, #3d3520 100%)',
  },
];

export default function FeaturedCollections() {
  return (
    <section className="section" id="featured-collections">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="label">Curated For You</span>
            <h2 className="heading-xl">Shop by Collection</h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {collections.map((col, i) => (
            <ScrollReveal key={col.title} delay={i * 100}>
              <Link href={col.href} className={styles.card}>
                <div className={styles.cardBg} style={{ background: col.gradient }} />
                <div className={styles.cardContent}>
                  <span className={styles.cardSubtitle}>{col.subtitle}</span>
                  <h3 className={styles.cardTitle}>{col.title}</h3>
                  <div className={styles.cardAction}>
                    <span>Explore</span>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
