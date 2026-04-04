'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { SlidersHorizontal, ChevronDown, X, Search as SearchIcon } from 'lucide-react';
import styles from './shop.module.css';

const categories = ['all', 'men', 'women', 'accessories', 'offers'];
const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Most Popular', value: 'popular' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get('category') || 'all';
  const queryParam = searchParams.get('search') || '';
  const sortParam = searchParams.get('sort') || 'newest';
  const collectionParam = searchParams.get('collection') || '';

  const [sortBy, setSortBy] = useState(sortParam);

  const activeCategory = categoryParam;
  const searchQuery = queryParam;
  const activeCollection = collectionParam;

  const handleCategoryChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('collection'); // Clear collection when switching categories
    if (cat === 'all') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/shop?${params.toString()}`);
  };

  const filtered = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      if (activeCategory === 'offers') {
        result = result.filter(p => p.originalPrice && p.originalPrice > p.price);
      } else {
        result = result.filter(p => p.category === activeCategory);
      }
    }

    // Collection filter
    if (activeCollection) {
      const col = activeCollection.toLowerCase();
      if (col === 'mens-collection') {
        result = result.filter(p => p.category === 'men');
      } else if (col === 'womens-collection') {
        result = result.filter(p => p.category === 'women');
      } else if (col === 'accessories-collection') {
        result = result.filter(p => p.category === 'accessories');
      } else if (col === 'new-arrivals') {
        result = result.filter(p => p.badge === 'new' || p.id === '1' || p.id === '3'); // Show newest items
      } else if (col === 'bestsellers') {
        result = result.filter(p => p.rating && p.rating >= 4.5);
      } else {
        result = result.filter(p => 
          p.category.toLowerCase().includes(col) || 
          p.name.toLowerCase().includes(col) ||
          (p as any).collection === activeCollection
        );
      }
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // Sort logic
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
  }, [activeCategory, searchQuery, activeCollection, sortBy]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className="container">
          <span className="label">
            {activeCollection ? activeCollection.replace(/-/g, ' ') : 'Our Collection'}
          </span>
          <h1 className="heading-display" style={{ marginTop: 'var(--space-md)' }}>
            {activeCollection ? activeCollection.replace(/-/g, ' ') : 'Shop'}
          </h1>
          <p className={styles.heroText}>
            Explore our curated selection of premium clothing and accessories.
          </p>
          {(searchQuery || activeCollection) && (
            <div className={styles.searchStatus}>
              <SearchIcon size={16} />
              <span>
                {searchQuery ? `Results for "${searchQuery}"` : `Viewing ${activeCollection.replace(/-/g, ' ')}`}
              </span>
              <button 
                onClick={() => router.push('/shop')}
                className={styles.clearSearch}
                aria-label="Clear all filters"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        <div className={styles.toolbar}>
          <div className={styles.categories}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat && !activeCollection ? styles.active : ''}`}
                onClick={() => handleCategoryChange(cat)}
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
                onChange={(e) => handleSortChange(e.target.value)}
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
            <p>No products found {searchQuery ? `for "${searchQuery}"` : 'matching your selection'}.</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => router.push('/shop')}
              style={{ marginTop: 'var(--space-md)' }}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: 'var(--space-5xl) 0' }}>Loading Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
