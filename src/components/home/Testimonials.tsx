'use client';

import { useState } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'Kavindu Perera',
    location: 'Colombo, Sri Lanka',
    rating: 5,
    text: 'The quality of AUREL\'s clothing is exceptional. The tailored blazer I purchased has become my most treasured piece. The attention to detail is unmatched.',
  },
  {
    name: 'Dilini Fernando',
    location: 'Galle, Sri Lanka',
    rating: 5,
    text: 'Finally, a brand that understands modern luxury without compromising on craftsmanship. The silk evening dress drapes like nothing I\'ve ever worn.',
  },
  {
    name: 'Tharindu Rathnayake',
    location: 'Kandy, Sri Lanka',
    rating: 5,
    text: 'The linen shirts fit impeccably right off the rack. The fabric quality is superb, and the construction is clearly made to last given our tropical climate.',
  },
  {
    name: 'Senali Silva',
    location: 'Negombo, Sri Lanka',
    rating: 5,
    text: 'Minimalist yet luxurious — exactly what I look for. AUREL pieces have become the foundation of my wardrobe. Worth every rupee.',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className={`section ${styles.section}`} id="testimonials">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="label">Testimonials</span>
            <h2 className="heading-xl">What Our Clients Say</h2>
            <div className="section-divider" />
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.carousel}>
            <div className={styles.card} key={current}>
              <div className={styles.stars}>
                {Array.from({ length: testimonials[current].rating }, (_, i) => (
                  <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />
                ))}
              </div>
              <p className={styles.text}>&ldquo;{testimonials[current].text}&rdquo;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>
                  {testimonials[current].name.charAt(0)}
                </div>
                <div>
                  <p className={styles.name}>{testimonials[current].name}</p>
                  <p className={styles.location}>{testimonials[current].location}</p>
                </div>
              </div>
            </div>

            <div className={styles.controls}>
              <button className={styles.navBtn} onClick={prev} aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>
              <div className={styles.dots}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === current ? styles.active : ''}`}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button className={styles.navBtn} onClick={next} aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
