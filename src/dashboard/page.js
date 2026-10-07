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
