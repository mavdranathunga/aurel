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
    image: 'https://images.unsplash.com/photo-1634295889011-439a70d7799b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFsZSUyMG1vZGVsfGVufDB8fDB8fHww',
  },
  {
    title: "Women's",
    subtitle: 'Modern Elegance',
    href: '/shop?category=women',
    gradient: 'linear-gradient(135deg, #2d1b2e 0%, #3d1f3d 50%, #4a1942 100%)',
    image: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZlbWFsZSUyMG1vZGVsfGVufDB8fDB8fHww',
  },
  {
    title: 'Accessories',
    subtitle: 'Finishing Touches',
    href: '/shop?category=accessories',
    gradient: 'linear-gradient(135deg, #1a1a0e 0%, #2d2b1e 50%, #3d3520 100%)',
    image: 'https://images.unsplash.com/photo-1631160246898-58192f971b5f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmVsdCUyMHdhdGNofGVufDB8fDB8fHww',
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
                <div className={styles.imageOverlay} />
                <img src={col.image} alt={col.title} className={styles.cardImage} />

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
