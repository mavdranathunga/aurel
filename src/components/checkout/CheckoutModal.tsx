'use client';

import { useState, useEffect } from 'react';
import { X, Check, Store, Truck, CreditCard } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { generateInvoicePDF, OrderData } from '@/lib/pdf';
import styles from './CheckoutModal.module.css';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  subtotal: number;
}

type DeliveryMethod = 'store' | 'cod' | 'online';

export default function CheckoutModal({ isOpen, onClose, onSuccess, subtotal }: CheckoutModalProps) {
  const { items } = useCart();
  const [method, setMethod] = useState<DeliveryMethod>('store');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    secondaryPhone: '',
    address: ''
  });

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setMethod('store');
      setErrorMsg(null);
      setFormData({ name: '', email: '', phone: '', secondaryPhone: '', address: '' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const shipping = method === 'cod' ? 15 : 0;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);
    
    try {
      const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      const date = new Date().toLocaleDateString();

      const orderData: OrderData = {
        orderId,
        date,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        secondaryPhone: formData.secondaryPhone,
        address: formData.address,
        method,
        subtotal,
        shipping,
        total
      };

      // Generate PDF
      const pdfBase64 = generateInvoicePDF(orderData, items);

      // Trigger automatic local download for the user
      const a = document.createElement('a');
      a.href = pdfBase64;
      a.download = `AUREL-Receipt-${orderId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Send to API to dispatch email
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          orderId,
          pdfBase64
        })
      });

      if (!response.ok) {
        // We won't block the UI if email fails, but we log it.
        console.error('Failed to send email');
      }

      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong processing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinish = () => {
    onSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Checkout</h2>
          {!success && (
            <button onClick={onClose} className={styles.closeBtn} aria-label="Close checkout">
              <X size={20} />
            </button>
          )}
        </div>

        {success ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <Check size={32} />
            </div>
            <h3 className={styles.successTitle}>Order Placed!</h3>
            <p className={styles.successText}>
              Thank you for your order. We've sent an invoice to your email ({formData.email}) and downloaded a copy to your device.
            </p>
            <button className="btn btn-primary" onClick={handleFinish}>
              Return to Shop
            </button>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles.body}>
              {errorMsg && <p style={{ color: 'var(--error)', marginBottom: 'var(--space-md)' }}>{errorMsg}</p>}
              
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input 
                  id="name" 
                  type="text" 
                  required 
                  className={styles.input} 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input 
                  id="email" 
                  type="email" 
                  required
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="For invoice and tracking"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input 
                  id="phone" 
                  type="tel" 
                  required 
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <h3 className={styles.sectionTitle}>Delivery & Payment</h3>
              <div className={styles.methodsGrid}>
                
                {/* Method 1: Store Pickup */}
                <div 
                  className={`${styles.methodCard} ${method === 'store' ? styles.selected : ''}`}
                  onClick={() => setMethod('store')}
                >
                  <div className={styles.radio}><div className={styles.radioInner} /></div>
                  <Store size={20} color="var(--text-secondary)" />
                  <div className={styles.methodInfo}>
                    <span className={styles.methodName}>Collect from Store</span>
                    <span className={styles.methodDesc}>Pick up at our flagship location. Free.</span>
                  </div>
                </div>

                {/* Method 2: COD */}
                <div 
                   className={`${styles.methodCard} ${method === 'cod' ? styles.selected : ''}`}
                   onClick={() => setMethod('cod')}
                >
                  <div className={styles.radio}><div className={styles.radioInner} /></div>
                  <Truck size={20} color="var(--text-secondary)" />
                  <div className={styles.methodInfo}>
                    <span className={styles.methodName}>Cash on Delivery</span>
                    <span className={styles.methodDesc}>Pay when package arrives. +Rs 15</span>
                  </div>
                </div>

                {/* Method 3: Online (Disabled) */}
                <div className={`${styles.methodCard} ${styles.disabled}`}>
                  <div className={styles.radio} />
                  <CreditCard size={20} color="var(--text-muted)" />
                  <div className={styles.methodInfo}>
                    <span className={styles.methodName}>Credit / Debit Card</span>
                    <span className={styles.methodDesc}>Secure online payment</span>
                  </div>
                  <span className={styles.badge}>Available Soon</span>
                </div>

              </div>

              {method === 'cod' && (
                <>
                  <div className={styles.formGroup} style={{ marginTop: 'var(--space-lg)' }}>
                    <label htmlFor="secondaryPhone">Secondary Phone Number (Optional)</label>
                    <input 
                      id="secondaryPhone" 
                      type="tel" 
                      className={styles.input}
                      value={formData.secondaryPhone}
                      onChange={(e) => setFormData({...formData, secondaryPhone: e.target.value})}
                      placeholder="Alternative contact for delivery rider"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="address">Delivery Address *</label>
                    <textarea 
                      id="address" 
                      required 
                      className={styles.input}
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Enter your full delivery address"
                    />
                  </div>
                </>
              )}

            </form>

            <div className={styles.footer}>
              <div className={styles.totalWrap}>
                <span className={styles.totalLabel}>Total to pay</span>
                <span className={styles.totalValue}>{formatPrice(total)}</span>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || (method === 'cod' && !formData.address)}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
