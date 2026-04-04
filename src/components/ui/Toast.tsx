'use client';

import { useCart } from '@/context/CartContext';
import { CheckCircle } from 'lucide-react';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast toast-success">
        <CheckCircle size={18} color="var(--success)" />
        <span style={{ fontSize: '0.875rem' }}>{toast}</span>
      </div>
    </div>
  );
}
