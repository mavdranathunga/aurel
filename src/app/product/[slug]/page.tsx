'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Heart, ShoppingBag, Minus, Plus, ChevronRight, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import ProductCard from '@/components/shop/ProductCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import styles from './product.module.css';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className={styles.notFound}>
        <div className="container" style={{ textAlign: 'center', paddingTop: '200px', paddingBottom: '200px' }}>
          <h1 className="heading-xl">Product Not Found</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 'var(--space-lg) 0' }}>
            The product you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link href="/shop" className="btn btn-primary">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedProducts(product);
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    const size = selectedSize || product.sizes.find(s => s.available)?.label || '';
    const color = selectedColor || product.colors[0].name;
    addItem(product, size, color);
  };

  const toggleAccordion = (key: string) => {
    setActiveAccordion(prev => prev === key ? null : key);
  };

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop">Shop</Link>
          <ChevronRight size={14} />
          <span>{product.name}</span>
        </nav>

        <div className={styles.productGrid}>
          {/* Images */}
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              {product.images && product.images.length > 0 ? (
                <img src={product.images[activeImage % product.images.length]} alt={product.name} className={styles.fullImage} />
              ) : (
                <div className={styles.imagePlaceholder} style={{ background: product.colors[activeImage % product.colors.length]?.hex + '22' }}>
                  <span className={styles.imageText}>{product.name}</span>
                </div>
              )}
              {product.badge && (
                <span className={`badge ${product.badge === 'new' ? 'badge-new' : product.badge === 'sale' ? 'badge-sale' : 'badge-bestseller'} ${styles.badge}`}>
                  {product.badge}
                </span>
              )}
            </div>
            
            <div className={styles.thumbnails}>
              {(product.images && product.images.length > 0 ? product.images : product.colors).map((item, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${activeImage === i ? styles.activeThumb : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  {product.images && product.images.length > 0 ? (
                    <img src={product.images[i]} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                  ) : (
                    <div style={{ background: (item as any).hex + '33', width: '100%', height: '100%', borderRadius: 'var(--radius-sm)' }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <span className={styles.category}>{product.subcategory}</span>
            <h1 className={styles.name}>{product.name}</h1>

            <div className={styles.ratingRow}>
              <div className={styles.stars}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} color="var(--accent)" />
                ))}
              </div>
              <span className={styles.ratingText}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.price}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className={styles.originalPrice}>{formatPrice(product.originalPrice)}</span>
                  <span className={styles.discount}>-{getDiscountPercentage(product.originalPrice, product.price)}% OFF</span>
                </>
              )}
            </div>

            <p className={styles.description}>{product.description}</p>

            {/* Color Selection */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                Color: <span>{selectedColor || product.colors[0].name}</span>
              </label>
              <div className={styles.colorOptions}>
                {product.colors.map(color => (
                  <button
                    key={color.name}
                    className={`${styles.colorBtn} ${(selectedColor || product.colors[0].name) === color.name ? styles.activeColor : ''}`}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                  >
                    <span style={{ background: color.hex }} className={styles.colorSwatch} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>Size</label>
              <div className={styles.sizeOptions}>
                {product.sizes.map(size => (
                  <button
                    key={size.label}
                    className={`${styles.sizeBtn} ${selectedSize === size.label ? styles.activeSize : ''} ${!size.available ? styles.disabledSize : ''}`}
                    onClick={() => size.available && setSelectedSize(size.label)}
                    disabled={!size.available}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className={styles.addRow}>
              <div className={styles.quantityControl}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className={styles.qtyBtn}><Minus size={16} /></button>
                <span className={styles.qtyValue}>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)} className={styles.qtyBtn}><Plus size={16} /></button>
              </div>
              <button className={`btn btn-primary ${styles.addBtn}`} onClick={handleAddToCart} id="add-to-cart">
                <ShoppingBag size={16} />
                Add to Cart
              </button>
              <button
                className={`${styles.wishBtn} ${wishlisted ? styles.wishlisted : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={20} fill={wishlisted ? 'var(--accent)' : 'none'} />
              </button>
            </div>

            {/* Features */}
            <div className={styles.features}>
              <div className={styles.feature}>
                <Truck size={18} />
                <span>Free shipping over $150</span>
              </div>
              <div className={styles.feature}>
                <RotateCcw size={18} />
                <span>30-day easy returns</span>
              </div>
              <div className={styles.feature}>
                <Shield size={18} />
                <span>2-year quality guarantee</span>
              </div>
            </div>

            {/* Accordions */}
            <div className={styles.accordions}>
              <div className={styles.accordion}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('details')}>
                  <span>Product Details</span>
                  <ChevronRight size={16} className={`${styles.accordionIcon} ${activeAccordion === 'details' ? styles.rotated : ''}`} />
                </button>
                {activeAccordion === 'details' && (
                  <div className={styles.accordionBody}>
                    <ul>
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className={styles.accordion}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('materials')}>
                  <span>Materials</span>
                  <ChevronRight size={16} className={`${styles.accordionIcon} ${activeAccordion === 'materials' ? styles.rotated : ''}`} />
                </button>
                {activeAccordion === 'materials' && (
                  <div className={styles.accordionBody}>
                    <p>{product.materials}</p>
                  </div>
                )}
              </div>

              <div className={styles.accordion}>
                <button className={styles.accordionHeader} onClick={() => toggleAccordion('care')}>
                  <span>Care Instructions</span>
                  <ChevronRight size={16} className={`${styles.accordionIcon} ${activeAccordion === 'care' ? styles.rotated : ''}`} />
                </button>
                {activeAccordion === 'care' && (
                  <div className={styles.accordionBody}>
                    <ul>
                      {product.care.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className={styles.related}>
            <ScrollReveal>
              <div className="section-header">
                <span className="label">You May Also Like</span>
                <h2 className="heading-lg">Related Products</h2>
                <div className="section-divider" />
              </div>
            </ScrollReveal>
            <div className={styles.relatedGrid}>
              {related.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <ProductCard product={p} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
