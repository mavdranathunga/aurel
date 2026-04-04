import { getFeaturedProducts } from '@/data/products';
import ProductCard from '@/components/shop/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './TrendingProducts.module.css';

export default function TrendingProducts() {
  const products = getFeaturedProducts();

  return (
    <section className={`section ${styles.section}`} id="trending-products">
      <div className="container">
        <ScrollReveal>
          <div className={styles.header}>
            <div>
              <span className="label">Trending Now</span>
              <h2 className="heading-xl">Most Wanted</h2>
            </div>
            <Link href="/shop" className="btn btn-secondary" id="view-all-products">
              View All
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="section-divider" style={{ margin: '0 0 var(--space-3xl) 0' }} />
        </ScrollReveal>

        <div className={styles.grid}>
          {products.map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 80}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
