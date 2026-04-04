'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addItem } = useCart();
  const wishlisted = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes.find(s => s.available)?.label || product.sizes[0].label;
    const defaultColor = product.colors[0].name;
    addItem(product, defaultSize, defaultColor);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Link href={`/product/${product.slug}`} className={styles.card} id={`product-card-${product.id}`}>
      <div className={styles.imageWrap}>
        <div className={styles.imagePlaceholder} style={{ background: product.colors[0].hex + '22' }}>
          <span className={styles.placeholderText}>{product.name.charAt(0)}</span>
        </div>

        {product.badge && (
          <span className={`badge ${product.badge === 'new' ? 'badge-new' : product.badge === 'sale' ? 'badge-sale' : 'badge-bestseller'} ${styles.badge}`}>
            {product.badge}
          </span>
        )}

        <div className={styles.overlay}>
          <button className={styles.actionBtn} onClick={handleQuickAdd} aria-label="Quick add to cart">
            <ShoppingBag size={16} />
          </button>
          <button
            className={`${styles.actionBtn} ${wishlisted ? styles.wishlisted : ''}`}
            onClick={handleWishlist}
            aria-label="Toggle wishlist"
          >
            <Heart size={16} fill={wishlisted ? 'var(--accent)' : 'none'} />
          </button>
        </div>
      </div>

      <div className={styles.info}>
        <span className={styles.category}>{product.subcategory}</span>
        <h3 className={styles.name}>{product.name}</h3>
        <div className={styles.priceRow}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <>
              <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
              <span className={styles.discount}>-{getDiscountPercentage(product.originalPrice, product.price)}%</span>
            </>
          )}
        </div>
        <div className={styles.colors}>
          {product.colors.map(color => (
            <span
              key={color.name}
              className={styles.colorDot}
              style={{ background: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}
