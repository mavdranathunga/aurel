'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Megamenu.module.css';

interface MegamenuProps {
  type: 'shop' | 'collections';
  onClose: () => void;
}

const data = {
  shop: [
    {
      title: 'Men',
      description: 'Tailored blazers, shirts, and essential trousers.',
      href: '/shop?category=men',
      image: 'https://images.unsplash.com/photo-1634295889011-439a70d7799b?w=400&auto=format&fit=crop',
    },
    {
      title: 'Women',
      description: 'Elegant dresses, silk tops, and modern silhouettes.',
      href: '/shop?category=women',
      image: 'https://images.unsplash.com/photo-1612874470096-d93a610de87b?w=400&auto=format&fit=crop',
    },
    {
      title: 'Accessories',
      description: 'Finishing touches: watches, belts, and jewelry.',
      href: '/shop?category=accessories',
      image: 'https://images.unsplash.com/photo-1631160246898-58192f971b5f?w=400&auto=format&fit=crop',
    },
    {
      title: 'Sale',
      description: 'Exclusive offers on last season favorites.',
      href: '/shop?category=offers',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&auto=format&fit=crop',
    },
  ],
  collections: [
    {
      title: "Men's Collection",
      description: 'Refined essentials for the modern gentleman.',
      href: '/shop?collection=mens-collection',
      image: 'https://plus.unsplash.com/premium_photo-1727942419945-1908baae3c8e?w=400&auto=format&fit=crop',
    },
    {
      title: "Women's Collection",
      description: 'Sophisticated silhouettes in luxurious fabrics.',
      href: '/shop?collection=womens-collection',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop',
    },
    {
      title: 'New Arrivals',
      description: 'Discover the latest from our SS26 line.',
      href: '/shop?collection=new-arrivals',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop',
    },
    {
      title: 'Iconic Labels',
      description: 'Our most coveted pieces, chosen by you.',
      href: '/shop?collection=bestsellers',
      image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400&auto=format&fit=crop',
    },
  ],
};

export default function Megamenu({ type, onClose }: MegamenuProps) {
  const items = data[type];

  return (
    <div className={styles.megamenu} onMouseLeave={onClose}>
      <div className={`container ${styles.grid}`}>
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className={styles.item}
            onClick={onClose}
          >
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.overlay} />
            </div>
            <div className={styles.content}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              <p className={styles.itemDesc}>{item.description}</p>
              <div className={styles.action}>
                <span>Explore</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
