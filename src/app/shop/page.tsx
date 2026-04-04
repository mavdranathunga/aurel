'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import styles from './shop.module.css';

const categories = ['all', 'men', 'women', 'accessories'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'all') {
      result = result.filter(p => p.category === activeCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <span className="label">Our Collection</span>
          <h1 className="heading-display" style={{ marginTop: 'var(--space-md)' }}>Shop</h1>
          <p className={styles.heroText}>
            Explore our curated selection of premium clothing and accessories.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.toolbar}>
          <div className={styles.categories}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.active : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat}`}
              >
                {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.toolbarRight}>
            <span className={styles.count}>{filtered.length} products</span>
            <div className={styles.sortWrap}>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`${styles.sortSelect} input select`}
                id="sort-select"
              >
                {sortOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          {filtered.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 50}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
