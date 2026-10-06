'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function CartDrawer() {
  const router = useRouter();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useCoffee();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCouponCode(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={() => setIsCartOpen(false)} style={{ zIndex: 1100 }}>
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            maxWidth: 440,
            backgroundColor: '#12100d',
            borderLeft: '1px solid rgba(217, 119, 6, 0.25)',
            boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1101
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'rgba(28, 23, 19, 0.5)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShoppingBag size={20} color="#f59e0b" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fcf9f2' }}>
                Keranjang Belanja ({cart.length})
              </h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                color: '#d1c7bc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart Item List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {cart.length === 0 ? (
              <div style={{ margin: 'auto 0', textAlign: 'center', padding: '40px 20px' }}>
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    background: 'rgba(245, 158, 11, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px'
                  }}
                >
                  <ShoppingBag size={32} color="#f59e0b" />
                </div>
                <h4 style={{ fontSize: '1.1rem', color: '#fcf9f2', marginBottom: 8 }}>
                  Keranjang Masih Kosong
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 20 }}>
                  Jelajahi biji kopi otentik dataran tinggi Gayo dan pilih profil sangrai favorit Anda.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/marketplace');
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Mulai Belanja Kopi
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: 14,
                    padding: 14,
                    borderRadius: 14,
                    background: 'rgba(28, 23, 19, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.07)'
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{ position: 'relative', width: 72, height: 72, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                    <Image
                      src={item.coffee?.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=200&q=80'}
                      alt={item.coffee?.name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 6 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fcf9f2', lineHeight: 1.3 }}>
                        {item.coffee?.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#ef4444', opacity: 0.8, cursor: 'pointer', padding: 2 }}
                        title="Hapus item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '4px 0 8px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 6px', borderRadius: 4 }}>
                        {item.grindSize}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#9ca3af', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 6px', borderRadius: 4 }}>
                        {item.weight}g
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f59e0b' }}>
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>

                      {/* Quantity buttons */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderRadius: 8,
                          padding: '2px 6px'
                        }}
                      >
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          style={{ color: '#d1c7bc', cursor: 'pointer' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, minWidth: 16, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          style={{ color: '#d1c7bc', cursor: 'pointer' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div
              style={{
                padding: '20px 24px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                backgroundColor: 'rgba(24, 20, 16, 0.95)'
              }}
            >
              {/* Promo input */}
              <div style={{ marginBottom: 14 }}>
                {appliedCoupon ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 12px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 8,
                      fontSize: '0.82rem',
                      color: '#86efac'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={14} />
                      <span>{appliedCoupon.label}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ color: '#fca5a5', fontSize: '0.75rem', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      placeholder="Kode kupon (GAYO10 / GAYOPREMIUM)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary btn-sm"
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      Terapkan
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16, fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <span>Subtotal Produk</span>
                  <span>Rp{cartSubtotal.toLocaleString('id-ID')}</span>
                </div>
                {cartDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86efac' }}>
                    <span>Diskon Kupon</span>
                    <span>-Rp{cartDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.15rem',
                    fontWeight: 800,
                    color: '#fcf9f2',
                    paddingTop: 8,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: '#f59e0b' }}>Rp{cartTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  onClick={handleProceedToCheckout}
                  className="btn btn-primary"
                  style={{ width: '100%', gap: 8 }}
                >
                  <span>Checkout Sekarang</span>
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/cart');
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%' }}
                >
                  Buka Halaman Keranjang Lengkap
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
