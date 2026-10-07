'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  ShoppingBag,
  Sparkles,
  Heart,
  Clock,
  ArrowRight,
  ShieldAlert,
  User,
  Star,
  Flame,
  MapPin,
  Tag,
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Package,
  Truck,
  Copy,
  Check,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import ProductCard from '@/components/ProductCard';

export default function UserDashboardPage() {
  const {
    coffees,
    categories,
    currentUser,
    orders,
    cart,
    cartCount,
    setIsCartOpen,
    setActiveProductModal,
    showToast
  } = useCoffee();

  // Filter & Search states for the user's catalog section
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedRoast, setSelectedRoast] = useState('all');
  const [copiedCoupon, setCopiedCoupon] = useState(null);

  // Origins & Roasts for filter
  const origins = ['all', 'Aceh Tengah (Takengon)', 'Bener Meriah', 'Gayo Lues'];
  const roasts = ['all', 'Light', 'Medium', 'Dark'];

  // Filter coffees displayed on user dashboard
  const filteredCoffees = useMemo(() => {
    return coffees.filter(item => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.process.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(item.flavor) && item.flavor.some(f => f.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      const matchOrigin =
        selectedOrigin === 'all' ||
        item.origin.toLowerCase().includes(selectedOrigin.toLowerCase().replace(/ \(.+\)/, ''));
      const matchRoast = selectedRoast === 'all' || item.roast.toLowerCase() === selectedRoast.toLowerCase();

      return matchSearch && matchCategory && matchOrigin && matchRoast;
    });
  }, [coffees, searchQuery, selectedCategory, selectedOrigin, selectedRoast]);

  // Customer statistics
  const userOrders = orders;
  const activeOrders = userOrders.filter(o => o.status !== 'Selesai');
  const completedOrders = userOrders.filter(o => o.status === 'Selesai');
  const totalSpent = userOrders
    .filter(o => o.payment.status === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const handleCopyCoupon = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCoupon(code);
    showToast(`Kode kupon ${code} berhasil disalin!`);
    setTimeout(() => setCopiedCoupon(null), 2500);
  };

  const isGuest = !currentUser || currentUser.role !== 'customer';

  return (
    <div className="container" style={{ paddingTop: 28, paddingBottom: 80, display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* Role-Aware Portal Banner */}
      {currentUser?.role === 'admin' ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.25) 0%, rgba(127, 29, 29, 0.15) 100%)',
            border: '1.5px solid rgba(225, 29, 72, 0.4)',
            color: '#fda4af',
            fontSize: '0.86rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #9f1239, #be123c)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              🛡️
            </div>
            <div>
              <strong>Pratinjau Admin: Anda sedang melihat Dashboard Pelanggan (User Portal)</strong>
              <span style={{ color: '#fca5a5', marginLeft: 8 }}>
                Ini adalah tampilan yang dilihat oleh pembeli. Untuk kontrol produk &amp; stok, gunakan Dashboard Admin.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/admin"
              className="btn btn-primary btn-sm"
              style={{
                padding: '6px 16px',
                fontSize: '0.82rem',
                background: 'linear-gradient(135deg, #be123c, #9f1239)',
                border: '1px solid rgba(244, 63, 94, 0.6)'
              }}
            >
              <ShieldAlert size={14} />
              <span>Kembali ke Dashboard Admin</span>
            </Link>
          </div>
        </div>
      ) : isGuest ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            color: '#fef3c7',
            fontSize: '0.86rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#f59e0b',
                color: '#120e09',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              👤
            </div>
            <div>
              <strong>Dashboard Pelanggan (User Portal)</strong>
              <span style={{ color: '#d1c7bc', marginLeft: 8 }}>
                Masuk ke akun pelanggan untuk melihat pelacakan pesanan, riwayat belanja, dan kupon diskon.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/auth"
              className="btn btn-primary btn-sm"
              style={{
                padding: '6px 16px',
                fontSize: '0.82rem'
              }}
            >
              <User size={14} />
              <span>Login Akun Pelanggan</span>
            </Link>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            padding: '12px 20px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(30, 23, 17, 0.5) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.25)',
            color: '#fef3c7',
            fontSize: '0.86rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: '#f59e0b',
                color: '#120e09',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800
              }}
            >
              👤
            </div>
            <div>
              <strong>Dashboard Pelanggan</strong>
              <span style={{ color: '#d1c7bc', marginLeft: 8 }}>
                Area khusus Anda untuk memantau pesanan aktif, poin loyalitas, serta promo biji kopi Gayo.
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/marketplace"
              className="btn btn-secondary btn-sm"
              style={{
                padding: '6px 14px',
                fontSize: '0.8rem'
              }}
            >
              <Coffee size={14} color="#f59e0b" />
              <span>Belanja Kopi</span>
            </Link>
          </div>
        </div>
      )}

      {/* Hero Customer Profile & Welcome Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{
          padding: '30px 32px',
          background: 'linear-gradient(135deg, rgba(30, 23, 17, 0.95) 0%, rgba(18, 14, 11, 0.98) 100%)',
          border: '1.5px solid rgba(245, 158, 11, 0.35)',
          borderRadius: 20,
          boxShadow: '0 12px 36px rgba(0, 0, 0, 0.5)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
          {/* Left: User Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                color: '#120e09',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontWeight: 800,
                boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)'
              }}
            >
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 className="font-serif" style={{ fontSize: '1.85rem', color: '#fcf9f2', margin: 0 }}>
                  Selamat Datang, {currentUser?.name || 'Pecinta Kopi Gayo'}!
                </h1>
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid rgba(245, 158, 11, 0.4)',
                    color: '#fbbf24',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  <Sparkles size={12} /> Member Gold
                </span>
              </div>
              <p style={{ color: '#d1c7bc', fontSize: '0.92rem', marginTop: 6, marginBottom: 0 }}>
                {currentUser?.email || 'Tamu / Customer Eksklusif'} • Pantau pesanan Anda dan nikmati seduhan biji kopi Gayo kualitas specialty terbaik.
              </p>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ padding: '9px 18px', gap: 8 }}
            >
              <ShoppingBag size={16} />
              <span>Keranjang ({cartCount})</span>
            </button>
            <Link
              href="/orders"
              className="btn btn-secondary btn-sm"
              style={{ padding: '9px 18px', gap: 8 }}
            >
              <Clock size={16} />
              <span>Riwayat Pesanan</span>
            </Link>
          </div>
        </div>
        {/* 4 Customer Highlights / Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
            marginTop: 28,
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* Card 1: Poin Loyalitas */}
          <div
            style={{
              background: 'rgba(245, 158, 11, 0.07)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: 14,
              padding: '14px 18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>Gayo Coffee Poin</span>
              <Sparkles size={16} color="#fbbf24" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#fbbf24' }}>
              1,450 Pts
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1c7bc', marginTop: 4 }}>
              Setara diskon Rp14.500
            </div>
          </div>

          {/* Card 2: Total Belanja */}
          <div
            style={{
              background: 'rgba(34, 197, 94, 0.07)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: 14,
              padding: '14px 18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>Total Belanja</span>
              <TrendingUp size={16} color="#86efac" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#86efac' }}>
              Rp{totalSpent.toLocaleString('id-ID')}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1c7bc', marginTop: 4 }}>
              Dari pesanan terverifikasi
            </div>
          </div>

          {/* Card 3: Pesanan Aktif */}
          <div
            style={{
              background: 'rgba(56, 189, 248, 0.07)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: 14,
              padding: '14px 18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>Pesanan Aktif</span>
              <Package size={16} color="#7dd3fc" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#7dd3fc' }}>
              {activeOrders.length} Pesanan
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1c7bc', marginTop: 4 }}>
              {activeOrders.length > 0 ? 'Sedang dalam pengiriman/proses' : 'Tidak ada pesanan berjalan'}
            </div>
          </div>

          {/* Card 4: Koleksi Biji Kopi Tersedia */}
          <div
            style={{
              background: 'rgba(168, 85, 247, 0.07)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
              borderRadius: 14,
              padding: '14px 18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 600 }}>Katalog Tersedia</span>
              <Coffee size={16} color="#d8b4fe" />
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#d8b4fe' }}>
              {coffees.length} Varian
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d1c7bc', marginTop: 4 }}>
              Disinkronkan dari Admin
            </div>
          </div>
        </div>
      </motion.div>

      {/* Promos & Coupon Banners for User */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16
        }}
      >
        {/* Voucher 1 */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 20px',
            border: '1px dashed rgba(245, 158, 11, 0.4)',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(20, 16, 12, 0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Tag size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fcf9f2', fontSize: '0.95rem' }}>Diskon 10% Pengguna Baru</div>
              <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Gunakan kode: <strong style={{ color: '#f59e0b' }}>GAYO10</strong></div>
            </div>
          </div>
          <button
            onClick={() => handleCopyCoupon('GAYO10')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            {copiedCoupon === 'GAYO10' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
            <span>{copiedCoupon === 'GAYO10' ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>

        {/* Voucher 2 */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 20px',
            border: '1px dashed rgba(168, 85, 247, 0.4)',
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(20, 16, 12, 0.6) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: 'rgba(168, 85, 247, 0.2)',
                color: '#d8b4fe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fcf9f2', fontSize: '0.95rem' }}>Diskon 15% Member Spesial</div>
              <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Gunakan kode: <strong style={{ color: '#d8b4fe' }}>GAYOPREMIUM</strong></div>
            </div>
          </div>
          <button
            onClick={() => handleCopyCoupon('GAYOPREMIUM')}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 14px', fontSize: '0.78rem' }}
          >
            {copiedCoupon === 'GAYOPREMIUM' ? <Check size={14} color="#86efac" /> : <Copy size={14} />}
            <span>{copiedCoupon === 'GAYOPREMIUM' ? 'Tersalin' : 'Salin'}</span>
          </button>
        </div>
      </div>

      {/* ACTIVE ORDERS TRACKER IN USER DASHBOARD */}
      {activeOrders.length > 0 && (
        <div
          className="glass-panel"
          style={{
            padding: '24px 28px',
            border: '1.5px solid rgba(56, 189, 248, 0.35)',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(18, 14, 11, 0.9) 100%)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
                <Truck size={18} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2', margin: 0 }}>
                  Pelacakan Pesanan Aktif Anda
                </h2>
                <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0 0' }}>
                  Pesanan sedang diproses dan dikirim langsung dari Dataran Tinggi Gayo, Aceh
                </p>
              </div>
            </div>

            <Link href="/orders" className="btn btn-secondary btn-sm" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <span>Lihat Detail Semua</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeOrders.slice(0, 2).map(order => (
              <div
                key={order.id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: 14,
                  padding: 16,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: 14
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.92rem' }}>
                      #{order.id}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 20,
                        background:
                          order.status === 'Dikirim' ? 'rgba(249, 115, 22, 0.2)' :
                          order.status === 'Diproses' ? 'rgba(168, 85, 247, 0.2)' :
                          'rgba(234, 179, 8, 0.2)',
                        color:
                          order.status === 'Dikirim' ? '#fdba74' :
                          order.status === 'Diproses' ? '#d8b4fe' :
                          '#fde047'
                      }}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#d1c7bc' }}>
                    {order.items?.map(it => `${it.coffee?.name || 'Kopi'} (${it.quantity}x)`).join(', ')}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: 4 }}>
                    Kurir: {order.courier} • Total: <strong style={{ color: '#fbbf24' }}>Rp{order.totalAmount?.toLocaleString('id-ID')}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <Link
                    href={`/orders?id=${order.id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                  >
                    <Eye size={14} />
                    <span>Lacak Status</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* =========================================================================
          MAIN SECTION: KOLEKSI KOPI PILIHAN DI DASHBOARD PELANGGAN
          ========================================================================= */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span
                style={{
                  background: 'rgba(245, 158, 11, 0.15)',
                  border: '1px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 10px',
                  borderRadius: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Sparkles size={12} />
                KATALOG KOPI SPESIALTI GAYO
              </span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '1.85rem', color: '#fcf9f2', margin: 0 }}>
              Katalog &amp; Rekomendasi Kopi Favorit
            </h2>
            <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4, marginBottom: 0 }}>
              Pilihan biji kopi Arabika Gayo asli Grade 1 segar sangrai mingguan siap dipesan langsung ke rumah Anda.
            </p>
          </div>

          <div style={{ fontSize: '0.86rem', color: '#d1c7bc' }}>
            Menampilkan <strong style={{ color: '#f59e0b' }}>{filteredCoffees.length}</strong> dari{' '}
            <strong>{coffees.length}</strong> produk kopi
          </div>
        </div>

        {/* Filter & Search Bar Controls */}
        <div
          className="glass-panel"
          style={{
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            border: '1px solid rgba(245, 158, 11, 0.25)'
          }}
        >
          {/* Search + Quick Category */}
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 420 }}>
              <Search
                size={16}
                color="#9ca3af"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Cari kopi, aroma, proses (Honey, Wine)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  paddingLeft: 40,
                  paddingRight: 14,
                  fontSize: '0.86rem',
                  width: '100%',
                  background: 'rgba(18, 15, 12, 0.85)',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  borderRadius: 10
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button
                onClick={() => setSelectedCategory('all')}
                style={{
                  padding: '7px 14px',
                  borderRadius: 20,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCategory === 'all' ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedCategory === 'all' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  color: selectedCategory === 'all' ? '#fbbf24' : '#d1c7bc'
                }}
              >
                Semua Kategori
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 20,
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedCategory === cat.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                    background: selectedCategory === cat.id ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    color: selectedCategory === cat.id ? '#fbbf24' : '#d1c7bc'
                  }}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Filters: Origin & Roast */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              flexWrap: 'wrap',
              paddingTop: 12,
              borderTop: '1px solid rgba(255, 255, 255, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#9ca3af' }}>
              <SlidersHorizontal size={14} /> Filter Detail:
            </div>

            {/* Origin Select */}
            <select
              value={selectedOrigin}
              onChange={(e) => setSelectedOrigin(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                borderRadius: 8,
                background: '#181512',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fcf9f2',
                width: 'auto'
              }}
            >
              <option value="all">Semua Asal / Origin</option>
              {origins.filter(o => o !== 'all').map(orig => (
                <option key={orig} value={orig}>{orig}</option>
              ))}
            </select>

            {/* Roast Select */}
            <select
              value={selectedRoast}
              onChange={(e) => setSelectedRoast(e.target.value)}
              style={{
                padding: '6px 12px',
                fontSize: '0.8rem',
                borderRadius: 8,
                background: '#181512',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#fcf9f2',
                width: 'auto'
              }}
            >
              <option value="all">Semua Level Roasting</option>
              {roasts.filter(r => r !== 'all').map(rst => (
                <option key={rst} value={rst}>{rst} Roast</option>
              ))}
            </select>

            {(searchQuery || selectedCategory !== 'all' || selectedOrigin !== 'all' || selectedRoast !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedOrigin('all');
                  setSelectedRoast('all');
                }}
                className="btn btn-secondary btn-sm"
                style={{ padding: '5px 12px', fontSize: '0.78rem', marginLeft: 'auto' }}
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Goods / Coffee Grid for User */}
        {filteredCoffees.length === 0 ? (
          <div
            className="glass-panel"
            style={{
              padding: '60px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 14
            }}
          >
            <Coffee size={48} color="#9ca3af" />
            <h3 style={{ fontSize: '1.2rem', color: '#fcf9f2', margin: 0 }}>
              Tidak ada produk kopi yang cocok
            </h3>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', maxWidth: 400 }}>
              Coba sesuaikan kata kunci pencarian atau reset filter untuk melihat katalog lengkap yang terdaftar.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedOrigin('all');
                setSelectedRoast('all');
              }}
              className="btn btn-primary btn-sm"
              style={{ padding: '8px 18px' }}
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 22
            }}
          >
            {filteredCoffees.map(coffee => (
              <ProductCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        )}
      </section>

      {/* Difference Explanation Box for End-Users */}
      <div
        className="glass-panel"
        style={{
          padding: '24px 28px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'rgba(20, 16, 13, 0.65)',
          borderRadius: 16
        }}
      >
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 12 }}>
          💡 Mengapa Dashboard User dan Admin Dibuat Berbeda?
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 18, fontSize: '0.85rem', color: '#d1c7bc' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.06)', padding: 14, borderRadius: 12, border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <div style={{ fontWeight: 700, color: '#fbbf24', marginBottom: 4 }}>
              ☕ Dashboard User (Halaman Ini):
            </div>
            Dirancang khusus untuk pembeli kopi — mengecek promo & voucher, menelusuri katalog kopi terbaru, memantau pengiriman barang, dan checkout dengan mudah.
          </div>
          <div style={{ background: 'rgba(159, 18, 57, 0.08)', padding: 14, borderRadius: 12, border: '1px solid rgba(159, 18, 57, 0.25)' }}>
            <div style={{ fontWeight: 700, color: '#fda4af', marginBottom: 4 }}>
              🛡️ Dashboard Admin (/admin):
            </div>
            Pusat komando pengelola — admin dapat melakukan **CRUD (Create, Read, Update, Delete)** barang, menambah produk kopi baru, mengatur stok barang, dan mengubah status pesanan pelanggan.
          </div>
        </div>
      </div>
    </div>
  );
}
