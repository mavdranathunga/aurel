'use client';

import Link from 'next/link';
import { Heart, ShoppingBag, X, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import styles from './wishlist.module.css';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (product: typeof items[0]) => {
    const defaultSize = product.sizes.find(s => s.available)?.label || product.sizes[0].label;
    addItem(product, defaultSize, product.colors[0].name);
    removeItem(product.id);
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <Heart size={48} strokeWidth={1} />
            </div>
            <h1 className="heading-lg">Your Wishlist is Empty</h1>
            <p className={styles.emptyText}>
              Save your favorite items here to find them easily later.
            </p>
            <Link href="/shop" className="btn btn-primary">
              Explore Collection
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className="heading-xl">Wishlist</h1>
          <span className={styles.count}>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className={styles.grid}>
          {items.map((product) => (
            <div key={product.id} className={styles.card}>
              <Link href={`/product/${product.slug}`} className={styles.imageWrap}>
                <div className={styles.imagePlaceholder} style={{ background: product.colors[0].hex + '22' }}>
                  <span>{product.name.charAt(0)}</span>
                </div>
              </Link>

              <button className={styles.removeBtn} onClick={() => removeItem(product.id)} aria-label="Remove from wishlist">
                <X size={16} />
              </button>

              <div className={styles.info}>
                <Link href={`/product/${product.slug}`} className={styles.name}>{product.name}</Link>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                <button className="btn btn-secondary" style={{ width: '100%', marginTop: 'var(--space-md)', padding: '10px' }} onClick={() => handleMoveToCart(product)}>
                  <ShoppingBag size={14} />
                  Move to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
