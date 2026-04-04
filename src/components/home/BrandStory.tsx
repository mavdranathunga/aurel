import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './BrandStory.module.css';

export default function BrandStory() {
  return (
    <section className={`section ${styles.section}`} id="brand-story">
      <div className="container">
        <div className={styles.grid}>
          <ScrollReveal>
            <div className={styles.imageCol}>
              <div className={styles.imageLg}>
                <div className={styles.imgPlaceholder}>
                  <span className={styles.imgLabel}>Craftsmanship</span>
                </div>
              </div>
              <div className={styles.imageSm}>
                <div className={styles.imgPlaceholder2}>
                  <span className={styles.imgLabel}>Detail</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className={styles.textCol}>
              <span className="label">Our Philosophy</span>
              <h2 className="heading-xl" style={{ marginTop: 'var(--space-md)' }}>
                Crafted with
                <br />
                <em style={{ color: 'var(--accent)' }}>Intention</em>
              </h2>
              <div className="section-divider" style={{ margin: 'var(--space-lg) 0' }} />
              <p className={styles.text}>
                At AUREL, every piece tells a story. We partner with artisans across Italy,
                Scotland, and Japan to source the finest materials — from Grade-A Mongolian
                cashmere to hand-tanned Italian leather.
              </p>
              <p className={styles.text}>
                Our designs honor the traditions of master craftsmanship while embracing
                the clean lines and understated confidence of modern style. Each garment
                is made to be worn, loved, and passed on.
              </p>

              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureNumber}>01</span>
                  <div>
                    <h4 className={styles.featureTitle}>Ethical Sourcing</h4>
                    <p className={styles.featureDesc}>Every material traceable to its origin</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureNumber}>02</span>
                  <div>
                    <h4 className={styles.featureTitle}>Artisan Made</h4>
                    <p className={styles.featureDesc}>Handcrafted by skilled craftspeople</p>
                  </div>
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureNumber}>03</span>
                  <div>
                    <h4 className={styles.featureTitle}>Timeless Design</h4>
                    <p className={styles.featureDesc}>Beyond trends, built to last</p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="btn btn-ghost" style={{ marginTop: 'var(--space-lg)' }}>
                Discover Our Story
                <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
