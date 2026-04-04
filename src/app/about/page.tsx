import ScrollReveal from '@/components/ui/ScrollReveal';
import type { Metadata } from 'next';
import styles from './about.module.css';

export const metadata: Metadata = {
  title: 'Our Story — AUREL',
  description: 'Discover the philosophy, craftsmanship, and values behind AUREL. Premium clothing made with intention.',
};

const values = [
  {
    number: '01',
    title: 'Uncompromising Quality',
    description: 'We source only the finest materials — from Grade-A Mongolian cashmere to Japanese selvedge cotton. Every fabric is hand-selected for its feel, durability, and beauty.',
  },
  {
    number: '02',
    title: 'Artisan Craftsmanship',
    description: 'Our garments are made by skilled artisans in Italy, Scotland, and Portugal. We believe in fair wages, ethical working conditions, and preserving centuries-old techniques.',
  },
  {
    number: '03',
    title: 'Timeless Design',
    description: 'We design beyond trends. Every AUREL piece is created to be worn season after season, becoming more personal with time rather than obsolete.',
  },
  {
    number: '04',
    title: 'Sustainable Practice',
    description: 'From responsible sourcing to plastic-free packaging, we minimize our environmental footprint at every step without compromising on luxury.',
  },
];

const milestones = [
  { year: '2018', event: 'AUREL founded in New York City' },
  { year: '2019', event: 'First flagship store opens in SoHo' },
  { year: '2020', event: 'Launch of digital-first direct-to-consumer model' },
  { year: '2021', event: 'Expansion into European markets' },
  { year: '2022', event: 'Introduction of fully traceable supply chain' },
  { year: '2023', event: 'Carbon-neutral certification achieved' },
  { year: '2024', event: 'Opening of London and Tokyo ateliers' },
  { year: '2025', event: '50,000+ clients worldwide' },
];

export default function AboutPage() {
  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <ScrollReveal>
            <span className="label">Our Story</span>
            <h1 className="heading-display" style={{ marginTop: 'var(--space-md)' }}>
              Crafted with
              <br />
              <em style={{ color: 'var(--accent)' }}>Purpose</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className={`section ${styles.story}`}>
        <div className="container">
          <div className={styles.storyGrid}>
            <ScrollReveal>
              <div className={styles.storyImage}>
                <div className={styles.storyImagePlaceholder}>
                  <span>Atelier</span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className={styles.storyText}>
                <h2 className="heading-lg" style={{ marginBottom: 'var(--space-lg)' }}>
                  Where Tradition Meets Tomorrow
                </h2>
                <p>
                  AUREL was born from a simple conviction: luxury should be thoughtful. Founded in 2018 by
                  a group of artisans and designers who shared a passion for exceptional garments, we set out to
                  create clothing that honors the traditions of master craftsmanship while embracing the quiet
                  confidence of modern style.
                </p>
                <p>
                  Today, each AUREL piece is the result of hundreds of hours of design, sourcing, and
                  refinement. We work directly with family-owned mills and workshops across Italy, Scotland,
                  Japan, and Portugal — ensuring every thread meets our uncompromising standards.
                </p>
                <p>
                  Our mission remains unchanged: to create garments that feel extraordinary, look timeless,
                  and are made responsibly. Because true luxury is never wasteful.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`section ${styles.valuesSection}`}>
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label">Our Values</span>
              <h2 className="heading-xl">What We Stand For</h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>

          <div className={styles.valuesGrid}>
            {values.map((val, i) => (
              <ScrollReveal key={val.number} delay={i * 100}>
                <div className={styles.valueCard}>
                  <span className={styles.valueNumber}>{val.number}</span>
                  <h3 className={styles.valueTitle}>{val.title}</h3>
                  <p className={styles.valueDesc}>{val.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="label">Our Journey</span>
              <h2 className="heading-xl">Milestones</h2>
              <div className="section-divider" />
            </div>
          </ScrollReveal>

          <div className={styles.timeline}>
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 80}>
                <div className={styles.timelineItem}>
                  <span className={styles.timelineYear}>{m.year}</span>
                  <div className={styles.timelineLine}>
                    <div className={styles.timelineDot} />
                  </div>
                  <p className={styles.timelineEvent}>{m.event}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
