'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Hero.module.css';

const slides = [
  {
    id: 1,
    type: 'brand',
    label: "SS '26 COLLECTION",
    titleLine1: "Redefine",
    titleLine2: "Your Elegance",
    subtitle: "Timeless sophistication meets modern design. Discover our curated collection of premium clothing crafted for the contemporary connoisseur.",
  },
  {
    id: 2,
    type: 'promo',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1920&auto=format&fit=crop',
    label: "LIMITED TIME OFFER",
    titleLine1: "Summer",
    titleLine2: "Essentials",
    subtitle: "Enjoy 15% off our exclusive summer collection. Refresh your wardrobe with breathable fabrics and effortless style.",
  },
  {
    id: 3,
    type: 'promo',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1920&auto=format&fit=crop',
    label: "SPECIAL PROMOTION",
    titleLine1: "Buy One,",
    titleLine2: "Get One Free",
    subtitle: "Elevate your look with our curated accessories. Buy any full-priced accessory and receive a second of equal or lesser value completely free.",
  }
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide]);

  const slide = slides[activeSlide];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className={styles.hero} id="hero-section">
      {/* Background rendering for all slides to enable smooth fading */}
      {slides.map((s, i) => (
        <div key={s.id}>
          {s.type === 'brand' ? (
            <div className={`${styles.bgGradient}`} style={{ opacity: activeSlide === i ? 1 : 0 }} />
          ) : (
            <img 
              src={s.image} 
              alt="Promotion" 
              className={`${styles.slideImage} ${activeSlide === i ? styles.active : ''}`}
            />
          )}
        </div>
      ))}

      {slide.type === 'promo' && <div className={styles.imageOverlay} />}
      <div className={styles.bgOverlay} />
      <div className={styles.grain} />

      {/* Decorative navigation elements */}
      <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={prevSlide} aria-label="Previous slide">
        <ChevronLeft size={32} />
      </button>
      <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={nextSlide} aria-label="Next slide">
        <ChevronRight size={32} />
      </button>

      {/* We uniquely key the content container to re-trigger the CSS animation on slide change */}
      <div key={activeSlide} className={`container ${styles.content} ${loaded ? styles.loaded : ''} ${slide.type === 'promo' ? styles.lightText : ''}`}>
        <div className={styles.textContainer}>
          <div className={styles.labelRow}>
            <div className={styles.line} />
            <span className={styles.label}>{slide.label}</span>
            <div className={styles.line} />
          </div>

          <h1 className={styles.title}>
            <span className={styles.titleLine}>{slide.titleLine1}</span>
            <span className={`${styles.titleLine} ${styles.italic}`}>{slide.titleLine2}</span>
          </h1>

          <p className={styles.subtitle}>
            {slide.subtitle}
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/shop" className="btn btn-primary" id="hero-shop-btn">
            Explore Collection
            <ArrowRight size={16} />
          </Link>
          <Link href={slide.type === 'promo' ? '/shop' : '/about'} className="btn btn-ghost" id="hero-secondary-btn">
            {slide.type === 'promo' ? 'Shop Offer' : 'Our Story'}
          </Link>
        </div>
      </div>

      <div className={`${styles.dots} ${slide.type === 'promo' ? styles.dotsLightText : ''}`}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${activeSlide === i ? styles.active : ''}`}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
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
