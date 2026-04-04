'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import CheckoutModal from '@/components/checkout/CheckoutModal';
import styles from './cart.module.css';

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const shipping = subtotal >= 150 ? 0 : 15;
  const total = subtotal + shipping;

  const handleCheckoutSuccess = () => {
    clearCart();
    setIsCheckoutOpen(false);
  };

  if (items.length === 0) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <ShoppingBag size={48} strokeWidth={1} />
            </div>
            <h1 className="heading-lg">Your Cart is Empty</h1>
            <p className={styles.emptyText}>
              Looks like you haven&apos;t added anything to your cart yet.
              Discover our collection and find something you love.
            </p>
            <Link href="/shop" className="btn btn-primary" id="shop-now-btn">
              Continue Shopping
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
          <h1 className="heading-xl">Shopping Cart</h1>
          <span className={styles.count}>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div className={styles.grid}>
          <div className={styles.itemsList}>
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}`} className={styles.item}>
                <div className={styles.itemImage}>
                  <div className={styles.imagePlaceholder} style={{ background: item.product.colors[0].hex + '22' }}>
                    <span>{item.product.name.charAt(0)}</span>
                  </div>
                </div>

                <div className={styles.itemInfo}>
                  <Link href={`/product/${item.product.slug}`} className={styles.itemName}>
                    {item.product.name}
                  </Link>
                  <div className={styles.itemMeta}>
                    <span>Size: {item.selectedSize}</span>
                    <span>Color: {item.selectedColor}</span>
                  </div>
                  <span className={styles.itemPrice}>{formatPrice(item.product.price)}</span>
                </div>

                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                      className={styles.qtyBtn}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className={styles.itemTotal}>{formatPrice(item.product.price * item.quantity)}</span>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item.product.id, item.selectedSize)}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className={styles.freeShipping}>FREE</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className={styles.shippingNote}>
                  Add {formatPrice(150 - subtotal)} more for free shipping
                </p>
              )}

              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button 
                className="btn btn-primary" 
                style={{ width: '100%', marginTop: 'var(--space-md)' }} 
                id="checkout-btn"
                onClick={() => setIsCheckoutOpen(true)}
              >
                Proceed to Checkout
              </button>

              <Link href="/shop" className={styles.continueLink}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleCheckoutSuccess}
        subtotal={subtotal}
      />
    </div>
  );
}
