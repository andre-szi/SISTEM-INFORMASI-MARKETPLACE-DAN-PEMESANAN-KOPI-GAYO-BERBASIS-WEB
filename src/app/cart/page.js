'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Tag,
  Check,
  ShieldCheck,
  Truck
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function CartPage() {
  const router = useRouter();
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useCoffee();

  const [couponCode, setCouponCode] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    if (applyCouponCode(couponCode)) {
      setCouponCode('');
    }
  };

  const estimatedShipping = cart.length > 0 ? 18000 : 0;
  const grandTotal = cartTotal + estimatedShipping;

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#fcf9f2', margin: 0 }}>
            Keranjang Belanja
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: 4 }}>
            Kelola pesanan biji kopi Gayo Anda sebelum melanjutkan ke formulir pengiriman.
          </p>
        </div>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            style={{
              color: '#f87171',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              cursor: 'pointer',
              background: 'rgba(239, 68, 68, 0.1)',
              padding: '6px 12px',
              borderRadius: 8,
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            <Trash2 size={14} />
            <span>Kosongkan Keranjang</span>
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            padding: '70px 20px',
            textAlign: 'center',
            maxWidth: 500,
            margin: '40px auto'
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(245, 158, 11, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <ShoppingBag size={34} color="#f59e0b" />
          </div>
          <h2 style={{ fontSize: '1.4rem', color: '#fcf9f2', marginBottom: 10 }}>
            Keranjang Belanja Masih Kosong
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.92rem', marginBottom: 24, lineHeight: 1.6 }}>
            Belum ada kopi pilihan yang ditambahkan. Silakan telusuri katalog kopi Arabika Gayo kami untuk memilih profil rasa favorit Anda.
          </p>
          <Link href="/marketplace" className="btn btn-primary">
            <span>Mulai Pilih Kopi</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32 }} className="cart-layout">
          {/* Left Table / List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {cart.map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  padding: 20,
                  display: 'flex',
                  gap: 20,
                  alignItems: 'center',
                  border: '1px solid rgba(217, 119, 6, 0.15)'
                }}
              >
                {/* Image */}
                <div style={{ position: 'relative', width: 84, height: 84, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <Image
                    src={item.coffee?.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=200&q=80'}
                    alt={item.coffee?.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 6 }}>
                    {item.coffee?.name}
                  </h3>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>
                      Gilingan: {item.grindSize}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af', background: 'rgba(255, 255, 255, 0.06)', padding: '2px 8px', borderRadius: 4 }}>
                      Berat: {item.weight} gram
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#d1c7bc' }}>
                      @ Rp{item.price.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Quantity and Subtotal */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 8, padding: '3px 8px' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        style={{ color: '#d1c7bc', cursor: 'pointer', padding: 3 }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        style={{ color: '#d1c7bc', cursor: 'pointer', padding: 3 }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f59e0b' }}>
                        Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#ef4444', opacity: 0.8, cursor: 'pointer', padding: 4 }}
                        title="Hapus dari keranjang"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: 10 }}>
              <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontSize: '0.9rem', fontWeight: 600 }}>
                <ArrowLeft size={16} />
                <span>Tambah Produk Kopi Lainnya</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div>
            <div
              className="glass-panel"
              style={{
                padding: 24,
                position: 'sticky',
                top: 96,
                border: '1px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: 12 }}>
                Ringkasan Pesanan
              </h3>

              {/* Promo Coupon Form */}
              <div style={{ marginBottom: 20 }}>
                {appliedCoupon ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(16, 185, 129, 0.12)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      borderRadius: 10,
                      color: '#86efac',
                      fontSize: '0.85rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Check size={16} />
                      <span>{appliedCoupon.label}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      style={{ color: '#fca5a5', fontSize: '0.78rem', textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      placeholder="Kupon (GAYO10 / GAYOPREMIUM)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{ fontSize: '0.85rem', padding: '9px 12px' }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm">
                      Pasang
                    </button>
                  </form>
                )}
              </div>

              {/* Price Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20, fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <span>Subtotal Kopi</span>
                  <span>Rp{cartSubtotal.toLocaleString('id-ID')}</span>
                </div>

                {cartDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86efac' }}>
                    <span>Potongan Kupon ({appliedCoupon?.discountPercent}%)</span>
                    <span>-Rp{cartDiscount.toLocaleString('id-ID')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Truck size={14} />
                    <span>Estimasi Ongkir</span>
                  </div>
                  <span>Rp{estimatedShipping.toLocaleString('id-ID')}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#fcf9f2',
                    paddingTop: 14,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <span>Total Pembayaran</span>
                  <span style={{ color: '#f59e0b' }}>Rp{grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => router.push('/checkout')}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem', gap: 8 }}
              >
                <span>Lanjut ke Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, color: '#9ca3af', fontSize: '0.78rem' }}>
                <ShieldCheck size={14} color="#10b981" />
                <span>Transaksi Belanja Aman & Terpercaya</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
