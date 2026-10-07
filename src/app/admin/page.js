'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  ShoppingBag,
  Coffee,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  BarChart3,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  SlidersHorizontal,
  X,
  Check,
  Flame,
  MapPin,
  ExternalLink,
  Layers,
  Sparkles,
  RefreshCw,
  Info
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const {
    coffees,
    categories,
    orders,
    currentUser,
    isAdminAuthenticated,
    updateOrderStatus,
    addCoffee,
    updateCoffee,
    deleteCoffee,
    updateStock,
    showToast
  } = useCoffee();

  // Protect admin route
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin' || !isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [currentUser, isAdminAuthenticated, router]);

  // Tab State: 'crud' (Dashboard CRUD Barang User), 'pipeline' (Pesanan & Omzet), 'compare' (Perbandingan Dashboard)
  const [activeTab, setActiveTab] = useState('crud');

  // Search & Filter for Products CRUD
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [stockFilter, setStockFilter] = useState('all'); // all, low, safe, out
  const [viewMode, setViewMode] = useState('table'); // table or grid

  // CRUD Modals State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [previewCoffee, setPreviewCoffee] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    categoryId: categories[0]?.id || 'cat-1',
    origin: 'Aceh Tengah (Takengon)',
    process: 'Honey',
    roast: 'Medium',
    flavor: 'Caramel, Chocolate, Sweet',
    weight: 200,
    price: 85000,
    stock: 25,
    description: '',
    elevation: '1500 - 1650 mdpl',
    acidity: 'Medium Clean',
    body: 'Smooth & Full',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  };

  const [formData, setFormData] = useState(initialForm);

  // Filter coffees for CRUD table
  const filteredCoffees = useMemo(() => {
    return coffees.filter(c => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.origin.toLowerCase().includes(search.toLowerCase()) ||
        c.process.toLowerCase().includes(search.toLowerCase());

      const matchCat = selectedCat === 'all' || c.categoryId === selectedCat;

      let matchStock = true;
      if (stockFilter === 'low') matchStock = c.stock > 0 && c.stock <= 15;
      if (stockFilter === 'out') matchStock = c.stock === 0;
      if (stockFilter === 'safe') matchStock = c.stock > 15;

      return matchSearch && matchCat && matchStock;
    });
  }, [coffees, search, selectedCat, stockFilter]);

  // Calculations for Metrics
  const totalRevenue = orders
    .filter(o => o.payment.status === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const lowStockCoffees = coffees.filter(c => c.stock <= 15);
  const outOfStockCoffees = coffees.filter(c => c.stock === 0);
  const totalStockUnits = coffees.reduce((sum, c) => sum + (c.stock || 0), 0);

  const statusCounts = {
    pending: orders.filter(o => o.status === 'Menunggu Pembayaran').length,
    confirmed: orders.filter(o => o.status === 'Dikonfirmasi').length,
    processing: orders.filter(o => o.status === 'Diproses').length,
    shipped: orders.filter(o => o.status === 'Dikirim').length,
    completed: orders.filter(o => o.status === 'Selesai').length,
  };

  const recentOrders = orders.slice(0, 6);

  // Form Handlers
  const handleOpenAdd = () => {
    setFormData(initialForm);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (coffee) => {
    setSelectedCoffee(coffee);
    setFormData({
      ...coffee,
      flavor: Array.isArray(coffee.flavor) ? coffee.flavor.join(', ') : coffee.flavor
    });
    setIsEditModalOpen(true);
  };

  const handleOpenDelete = (coffee) => {
    setSelectedCoffee(coffee);
    setIsDeleteModalOpen(true);
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Nama produk tidak boleh kosong!', 'error');
      return;
    }
    addCoffee(formData);
    setIsAddModalOpen(false);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Nama produk tidak boleh kosong!', 'error');
      return;
    }
    updateCoffee(selectedCoffee.id, formData);
    setIsEditModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (selectedCoffee) {
      deleteCoffee(selectedCoffee.id);
      setIsDeleteModalOpen(false);
      setSelectedCoffee(null);
    }
  };

  // Quick Stock Step
  const handleQuickStockChange = (id, currentStock, delta) => {
    const newStock = Math.max(0, currentStock + delta);
    updateStock(id, newStock);
  };

  // Auth loading state
  if (!currentUser || currentUser.role !== 'admin' || !isAdminAuthenticated()) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <ShieldCheck size={48} color="#9f1239" />
        <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>Memeriksa autentikasi admin...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingBottom: 40 }}>
      {/* =========================================================================
          TOP EXECUTIVE COMMAND BAR (DISTINCTIVE ADMIN PALETTE: BURGUNDY / OBSIDIAN)
          ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{
          padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.28) 0%, rgba(18, 14, 13, 0.96) 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.4)',
          borderRadius: 20,
          boxShadow: '0 8px 30px rgba(159, 18, 57, 0.15)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
          {/* Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div
              style={{
                width: 58,
                height: 58,
                borderRadius: 16,
                background: 'linear-gradient(135deg, #9f1239 0%, #be123c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(159, 18, 57, 0.45)',
                color: '#fff'
              }}
            >
              <ShieldCheck size={32} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 className="font-serif" style={{ fontSize: '1.85rem', color: '#fcf9f2', margin: 0 }}>
                  Admin Dashboard & Command Center
                </h1>
                <span
                  style={{
                    background: 'rgba(225, 29, 72, 0.2)',
                    border: '1px solid rgba(225, 29, 72, 0.45)',
                    color: '#fda4af',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    padding: '3px 10px',
                    borderRadius: 20,
                    letterSpacing: '0.5px'
                  }}
                >
                  SUPER ADMIN
                </span>
              </div>
              <p style={{ color: '#d1c7bc', fontSize: '0.88rem', marginTop: 4, marginBottom: 0 }}>
                Kelola penuh katalog barang user, kontrol stok, dan pantau seluruh transaksi marketplace Kopi Gayo.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenAdd}
              className="btn btn-primary"
              style={{
                padding: '9px 18px',
                gap: 8,
                background: 'linear-gradient(135deg, #be123c, #9f1239)',
                border: '1px solid rgba(244, 63, 94, 0.5)',
                color: '#fff'
              }}
            >
              <Plus size={18} />
              <span>+ Tambah Barang Baru</span>
            </button>

            <Link
              href="/dashboard"
              className="btn btn-secondary"
              style={{
                padding: '9px 18px',
                gap: 8,
                borderColor: 'rgba(245, 158, 11, 0.4)',
                color: '#fbbf24'
              }}
            >
              <Eye size={16} />
              <span>Lihat Tampilan Dashboard User</span>
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>

        {/* Real-time Status Strip */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: '0.82rem',
            color: '#9ca3af'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 10px #22c55e' }} />
            <span style={{ color: '#86efac', fontWeight: 600 }}>Mesin Sinkronisasi Real-Time: AKTIF</span>
            <span style={{ color: '#6b7280' }}>—</span>
            <span>Setiap penambahan, pengubahan, atau penghapusan barang di sini langsung terbit di Dashboard User</span>
          </div>

          <div style={{ color: '#fda4af', fontWeight: 600 }}>
            Login sebagai: <span style={{ color: '#fcf9f2' }}>{currentUser.name}</span> ({currentUser.email})
          </div>
        </div>
      </motion.div>

      {/* =========================================================================
          EXECUTIVE KPI METRICS (4 CARDS)
          ========================================================================= */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: 16 }}>
        {/* Card 1: Omzet */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(245, 158, 11, 0.35)', background: 'rgba(28, 23, 19, 0.75)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Pendapatan
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#f59e0b' }}>
            Rp{totalRevenue.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#86efac', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={12} /> Dari pesanan terbayar
          </div>
        </div>

        {/* Card 2: Total Pesanan */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(56, 189, 248, 0.35)', background: 'rgba(28, 23, 19, 0.75)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Pesanan
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#fcf9f2' }}>
            {orders.length} Transaksi
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7dd3fc', marginTop: 4 }}>
            {statusCounts.completed} pesanan tuntas selesai
          </div>
        </div>

        {/* Card 3: Total Barang di Dashboard User */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(168, 85, 247, 0.35)', background: 'rgba(28, 23, 19, 0.75)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Barang di Dashboard User
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Coffee size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#fcf9f2' }}>
            {coffees.length} Varian
          </div>
          <div style={{ fontSize: '0.75rem', color: '#d8b4fe', marginTop: 4 }}>
            Total fisik: {totalStockUnits} pcs
          </div>
        </div>

        {/* Card 4: Stok Kritis Alert */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(239, 68, 68, 0.35)', background: 'rgba(28, 23, 19, 0.75)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Stok Kritis (&le;15)
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.55rem', fontWeight: 800, color: '#fca5a5' }}>
            {lowStockCoffees.length} Produk
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fca5a5', marginTop: 4 }}>
            {outOfStockCoffees.length > 0 ? `${outOfStockCoffees.length} varian habis total` : 'Perlu restock segera'}
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB NAVIGATION SWITCHER (CRUD BARANG USER vs PIPELINE PESANAN vs PERBANDINGAN)
          ========================================================================= */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          borderBottom: '1.5px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: 2,
          flexWrap: 'wrap'
        }}
      >
        <button
          onClick={() => setActiveTab('crud')}
          style={{
            padding: '11px 22px',
            borderRadius: '12px 12px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            border: activeTab === 'crud' ? '1.5px solid rgba(225, 29, 72, 0.5)' : '1px solid transparent',
            borderBottom: activeTab === 'crud' ? '2px solid #be123c' : '1px solid transparent',
            background: activeTab === 'crud' ? 'rgba(159, 18, 57, 0.25)' : 'transparent',
            color: activeTab === 'crud' ? '#fda4af' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          <Layers size={17} />
          <span>Dashboard CRUD Barang User</span>
          <span
            style={{
              background: '#9f1239',
              color: '#fff',
              fontSize: '0.72rem',
              padding: '2px 8px',
              borderRadius: 12
            }}
          >
            {coffees.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('pipeline')}
          style={{
            padding: '11px 22px',
            borderRadius: '12px 12px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            border: activeTab === 'pipeline' ? '1.5px solid rgba(225, 29, 72, 0.5)' : '1px solid transparent',
            borderBottom: activeTab === 'pipeline' ? '2px solid #be123c' : '1px solid transparent',
            background: activeTab === 'pipeline' ? 'rgba(159, 18, 57, 0.25)' : 'transparent',
            color: activeTab === 'pipeline' ? '#fda4af' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          <ShoppingBag size={17} />
          <span>Status Pesanan & Pipeline</span>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#d1c7bc',
              fontSize: '0.72rem',
              padding: '2px 8px',
              borderRadius: 12
            }}
          >
            {orders.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          style={{
            padding: '11px 22px',
            borderRadius: '12px 12px 0 0',
            fontWeight: 700,
            fontSize: '0.92rem',
            cursor: 'pointer',
            border: activeTab === 'compare' ? '1.5px solid rgba(225, 29, 72, 0.5)' : '1px solid transparent',
            borderBottom: activeTab === 'compare' ? '2px solid #be123c' : '1px solid transparent',
            background: activeTab === 'compare' ? 'rgba(159, 18, 57, 0.25)' : 'transparent',
            color: activeTab === 'compare' ? '#fda4af' : '#9ca3af',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s'
          }}
        >
          <Info size={17} />
          <span>Perbandingan: Admin vs User Dashboard</span>
        </button>
      </div>

      {/* =========================================================================
          TAB 1: DASHBOARD CRUD BARANG USER (FITUR UTAMA)
          ========================================================================= */}
      {activeTab === 'crud' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {/* Section Heading & Subtitle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 14 }}>
            <div>
              <h2 className="font-serif" style={{ fontSize: '1.5rem', color: '#fcf9f2', margin: 0 }}>
                Manajemen CRUD Barang (Tampil di Dashboard User)
              </h2>
              <p style={{ color: '#9ca3af', fontSize: '0.86rem', marginTop: 4, marginBottom: 0 }}>
                Admin dapat menambah barang baru, mengubah data &amp; stok langsung, menghapus barang, serta melihat bagaimana barang tersebut tampil di hadapan pembeli.
              </p>
            </div>

            <button
              onClick={handleOpenAdd}
              className="btn btn-primary"
              style={{
                padding: '9px 18px',
                gap: 8,
                background: 'linear-gradient(135deg, #15803d, #166534)',
                borderColor: 'rgba(34, 197, 94, 0.4)'
              }}
            >
              <Plus size={18} />
              <span>+ Tambah Kopi Baru</span>
            </button>
          </div>

          {/* Search, Category, Stock Filters */}
          <div
            className="glass-panel"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 14,
              border: '1.5px solid rgba(159, 18, 57, 0.3)'
            }}
          >
            {/* Search */}
            <div style={{ position: 'relative', width: 280 }}>
              <Search size={15} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Cari nama kopi, origin..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ paddingLeft: 36, fontSize: '0.84rem' }}
              />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Kategori:</span>
              <select
                value={selectedCat}
                onChange={(e) => setSelectedCat(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto', background: '#181512' }}
              >
                <option value="all">Semua Kategori</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Stock Filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Status Stok:</span>
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto', background: '#181512' }}
              >
                <option value="all">Semua Stok</option>
                <option value="safe">Stok Aman (&gt;15)</option>
                <option value="low">Stok Kritis (&le;15)</option>
                <option value="out">Stok Habis (0)</option>
              </select>
            </div>

            {/* Counter */}
            <div style={{ fontSize: '0.84rem', color: '#9ca3af', marginLeft: 'auto' }}>
              Terfilter: <strong style={{ color: '#fda4af' }}>{filteredCoffees.length}</strong> produk
            </div>
          </div>

          {/* CRUD Main Table */}
          <div
            className="glass-panel"
            style={{
              padding: 20,
              overflowX: 'auto',
              border: '1.5px solid rgba(159, 18, 57, 0.25)',
              background: 'rgba(24, 20, 18, 0.9)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid rgba(255, 255, 255, 0.12)', color: '#9ca3af', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <th style={{ padding: '12px 10px' }}>Produk Kopi (User)</th>
                  <th style={{ padding: '12px 10px' }}>Origin &amp; Roasting</th>
                  <th style={{ padding: '12px 10px' }}>Harga (/200g)</th>
                  <th style={{ padding: '12px 10px' }}>Stok Real-time</th>
                  <th style={{ padding: '12px 10px' }}>Status Tampil di User</th>
                  <th style={{ padding: '12px 10px', textAlign: 'center' }}>Aksi CRUD</th>
                </tr>
              </thead>
              <tbody>
                {filteredCoffees.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px 10px', color: '#9ca3af' }}>
                      Tidak ada barang yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredCoffees.map(coffee => {
                    const isLowStock = coffee.stock <= 15;
                    const isOutOfStock = coffee.stock === 0;

                    return (
                      <tr
                        key={coffee.id}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'background 0.2s'
                        }}
                      >
                        {/* Name & Photo */}
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{ position: 'relative', width: 46, height: 46, borderRadius: 10, overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.1)' }}>
                              <Image
                                src={coffee.image}
                                alt={coffee.name}
                                fill
                                sizes="46px"
                                style={{ objectFit: 'cover' }}
                              />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#fcf9f2', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span>{coffee.name}</span>
                                {coffee.isFeatured && (
                                  <span style={{ fontSize: '0.68rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '1px 6px', borderRadius: 4, border: '1px solid rgba(245, 158, 11, 0.4)' }}>
                                    Featured
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#9ca3af', marginTop: 2 }}>
                                {categories.find(c => c.id === coffee.categoryId)?.name || 'Specialty'} • {coffee.process}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Origin & Roast */}
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ color: '#d1c7bc' }}>{coffee.origin}</div>
                          <div style={{ fontSize: '0.74rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <Flame size={11} /> {coffee.roast} Roast
                          </div>
                        </td>

                        {/* Price */}
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.92rem' }}>
                            Rp{coffee.price?.toLocaleString('id-ID')}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                            per {coffee.weight || 200}g
                          </div>
                        </td>

                        {/* Stock with Instant +/- Adjuster */}
                        <td style={{ padding: '12px 10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <button
                              onClick={() => handleQuickStockChange(coffee.id, coffee.stock, -1)}
                              disabled={coffee.stock <= 0}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#fcf9f2',
                                cursor: coffee.stock <= 0 ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 700
                              }}
                              title="Kurangi stok 1"
                            >
                              -
                            </button>

                            <input
                              type="number"
                              min={0}
                              value={coffee.stock}
                              onChange={(e) => updateStock(coffee.id, Number(e.target.value))}
                              style={{
                                width: 55,
                                padding: '4px 6px',
                                textAlign: 'center',
                                fontSize: '0.84rem',
                                fontWeight: 700,
                                borderRadius: 6,
                                border: isOutOfStock
                                  ? '1px solid #ef4444'
                                  : isLowStock
                                  ? '1px solid #f59e0b'
                                  : '1px solid rgba(255, 255, 255, 0.15)',
                                color: isOutOfStock ? '#fca5a5' : isLowStock ? '#fbbf24' : '#fcf9f2',
                                background: 'rgba(0, 0, 0, 0.3)'
                              }}
                            />

                            <button
                              onClick={() => handleQuickStockChange(coffee.id, coffee.stock, 1)}
                              style={{
                                width: 24,
                                height: 24,
                                borderRadius: 6,
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#fcf9f2',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.9rem',
                                fontWeight: 700
                              }}
                              title="Tambah stok 1"
                            >
                              +
                            </button>
                          </div>

                          <div style={{ marginTop: 4 }}>
                            {isOutOfStock ? (
                              <span style={{ fontSize: '0.7rem', color: '#ef4444', fontWeight: 700 }}>Habis (0 pcs)</span>
                            ) : isLowStock ? (
                              <span style={{ fontSize: '0.7rem', color: '#f59e0b', fontWeight: 700 }}>Kritis (&le;15 pcs)</span>
                            ) : (
                              <span style={{ fontSize: '0.7rem', color: '#86efac', fontWeight: 600 }}>Stok Aman</span>
                            )}
                          </div>
                        </td>

                        {/* Status Tampil di Dashboard User */}
                        <td style={{ padding: '12px 10px' }}>
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                              padding: '4px 10px',
                              borderRadius: 20,
                              background: 'rgba(34, 197, 94, 0.15)',
                              border: '1px solid rgba(34, 197, 94, 0.35)',
                              color: '#86efac',
                              fontSize: '0.74rem',
                              fontWeight: 700
                            }}
                          >
                            <CheckCircle2 size={12} />
                            Tampil di User
                          </span>
                        </td>

                        {/* Action Buttons (CRUD) */}
                        <td style={{ padding: '12px 10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                            {/* Preview as User */}
                            <button
                              onClick={() => setPreviewCoffee(coffee)}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(56, 189, 248, 0.15)',
                                border: '1px solid rgba(56, 189, 248, 0.35)',
                                color: '#38bdf8',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Lihat preview tampilan di dashboard user"
                            >
                              <Eye size={15} />
                            </button>

                            {/* Edit (Update) */}
                            <button
                              onClick={() => handleOpenEdit(coffee)}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(245, 158, 11, 0.15)',
                                border: '1px solid rgba(245, 158, 11, 0.35)',
                                color: '#fbbf24',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Edit rincian produk kopi"
                            >
                              <Edit2 size={15} />
                            </button>

                            {/* Delete (Delete) */}
                            <button
                              onClick={() => handleOpenDelete(coffee)}
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.35)',
                                color: '#f87171',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              title="Hapus produk dari dashboard user"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: PIPELINE STATUS PESANAN & TRANSAKSI
          ========================================================================= */}
      {activeTab === 'pipeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Pipeline Visual Stepper Cards */}
          <div className="glass-panel" style={{ padding: 24, border: '1.5px solid rgba(159, 18, 57, 0.3)' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 16 }}>
              Status Distribusi Pesanan Pelanggan
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14 }}>
              <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fde047', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                  <Clock size={15} /> Belum Bayar
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fde047' }}>
                  {statusCounts.pending}
                </div>
              </div>

              <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7dd3fc', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                  <CheckCircle2 size={15} /> Dikonfirmasi
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#7dd3fc' }}>
                  {statusCounts.confirmed}
                </div>
              </div>

              <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d8b4fe', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                  <Package size={15} /> Diproses
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#d8b4fe' }}>
                  {statusCounts.processing}
                </div>
              </div>

              <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fdba74', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                  <Truck size={15} /> Dikirim
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fdba74' }}>
                  {statusCounts.shipped}
                </div>
              </div>

              <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: 14, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#86efac', fontSize: '0.78rem', fontWeight: 700, marginBottom: 6 }}>
                  <CheckCircle2 size={15} /> Selesai
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#86efac' }}>
                  {statusCounts.completed}
                </div>
              </div>
            </div>
          </div>

          {/* Orders Table with Status Changer */}
          <div className="glass-panel" style={{ padding: 24, border: '1.5px solid rgba(159, 18, 57, 0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2', margin: 0 }}>
                  Daftar Pesanan &amp; Ubah Status Langsung
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#9ca3af', margin: '4px 0 0 0' }}>
                  Admin dapat memperbarui status pesanan seketika — perubahan langsung terpantau di Dashboard Pelanggan.
                </p>
              </div>
              <Link href="/admin/orders" className="btn btn-secondary btn-sm">
                <span>Kelola Semua Pesanan</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
                    <th style={{ padding: '10px 12px' }}>ID Pesanan</th>
                    <th style={{ padding: '10px 12px' }}>Pelanggan</th>
                    <th style={{ padding: '10px 12px' }}>Item Kopi</th>
                    <th style={{ padding: '10px 12px' }}>Total Biaya</th>
                    <th style={{ padding: '10px 12px' }}>Pembayaran</th>
                    <th style={{ padding: '10px 12px' }}>Ubah Status Pesanan</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#f59e0b' }}>
                        #{order.id}
                      </td>
                      <td style={{ padding: '12px', color: '#fcf9f2' }}>
                        <div>{order.customerName}</div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{order.courier}</div>
                      </td>
                      <td style={{ padding: '12px', color: '#d1c7bc', fontSize: '0.8rem' }}>
                        {order.items?.map(it => `${it.coffee?.name} (${it.quantity}x)`).join(', ')}
                      </td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#fbbf24' }}>
                        Rp{order.totalAmount?.toLocaleString('id-ID')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span
                          style={{
                            fontSize: '0.74rem',
                            padding: '3px 8px',
                            borderRadius: 4,
                            background: order.payment.status === 'Paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                            color: order.payment.status === 'Paid' ? '#86efac' : '#fde047'
                          }}
                        >
                          {order.payment.method} ({order.payment.status})
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '6px 10px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            width: 'auto',
                            background: '#181512',
                            border: '1px solid rgba(255, 255, 255, 0.15)'
                          }}
                        >
                          <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                          <option value="Dikonfirmasi">Dikonfirmasi</option>
                          <option value="Diproses">Diproses</option>
                          <option value="Dikirim">Dikirim</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: PERBANDINGAN DASHBOARD ADMIN vs DASHBOARD USER
          ========================================================================= */}
      {activeTab === 'compare' && (
        <div className="glass-panel" style={{ padding: 28, border: '1.5px solid rgba(159, 18, 57, 0.35)' }}>
          <h2 className="font-serif" style={{ fontSize: '1.45rem', color: '#fcf9f2', marginBottom: 8 }}>
            Tinjauan Perbedaan: Dashboard Admin vs Dashboard User
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginBottom: 24 }}>
            Sistem memisahkan secara tegas pengalaman dan hak akses antara Admin (Pengelola) dengan User (Pelanggan/Pembeli).
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
            {/* Admin Dashboard Column */}
            <div
              style={{
                background: 'rgba(159, 18, 57, 0.12)',
                border: '1.5px solid rgba(225, 29, 72, 0.4)',
                borderRadius: 16,
                padding: 22
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#9f1239', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fda4af', margin: 0, fontWeight: 700 }}>
                    Dashboard Admin (/admin)
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#fca5a5' }}>Khusus Super Admin &amp; Pengelola</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: '#d1c7bc' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fda4af', fontWeight: 800 }}>✓</span>
                  <span><strong>Hak Akses Penuh:</strong> Wajib login dengan email <code>admin@kopigayo.id</code>.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fda4af', fontWeight: 800 }}>✓</span>
                  <span><strong>Fitur CRUD Barang:</strong> Menambah produk baru, mengedit data kopi, menghapus varian, dan mengubah stok real-time.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fda4af', fontWeight: 800 }}>✓</span>
                  <span><strong>Manajemen Pesanan:</strong> Mengubah status pesanan dari Belum Bayar hingga Selesai.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fda4af', fontWeight: 800 }}>✓</span>
                  <span><strong>Tema Visual:</strong> Nuansa Dark Obsidian dengan Burgundy/Wine (#9f1239) &amp; Security Badges.</span>
                </li>
              </ul>
            </div>

            {/* User Dashboard Column */}
            <div
              style={{
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1.5px solid rgba(245, 158, 11, 0.35)',
                borderRadius: 16,
                padding: 22
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#120e09' }}>
                  <Coffee size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#fbbf24', margin: 0, fontWeight: 700 }}>
                    Dashboard User (/dashboard)
                  </h3>
                  <div style={{ fontSize: '0.76rem', color: '#fde68a' }}>Khusus Customer &amp; Pecinta Kopi</div>
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: '#d1c7bc' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fbbf24', fontWeight: 800 }}>✓</span>
                  <span><strong>Fokus Pengguna:</strong> Melihat promo, menelusuri biji kopi pilihan, melacak pesanan aktif, dan checkout.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fbbf24', fontWeight: 800 }}>✓</span>
                  <span><strong>Barang Tersinkron:</strong> Menampilkan katalog kopi hasil CRUD dari Dashboard Admin.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fbbf24', fontWeight: 800 }}>✓</span>
                  <span><strong>Poin &amp; Kupon:</strong> Menampilkan poin loyalitas member, kupon diskon (GAYO10, GAYOPREMIUM).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <span style={{ color: '#fbbf24', fontWeight: 800 }}>✓</span>
                  <span><strong>Tema Visual:</strong> Nuansa hangat khas kopi dataran tinggi (Warm Amber, Espresso, Gold Crema).</span>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ marginTop: 22, textAlign: 'center' }}>
            <Link
              href="/dashboard"
              className="btn btn-primary"
              style={{ padding: '10px 24px', fontSize: '0.88rem' }}
            >
              <span>Uji Langsung: Buka Dashboard User</span>
              <ExternalLink size={16} />
            </Link>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 1: CREATE (TAMBAH PRODUK BARU KE DASHBOARD USER)
          ========================================================================= */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 680,
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: 28,
                borderRadius: 20,
                border: '1.5px solid rgba(225, 29, 72, 0.4)',
                background: '#181412',
                zIndex: 310,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#9f1239', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <Plus size={20} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fcf9f2', margin: 0 }}>
                      Tambah Kopi Baru ke Dashboard User
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0 0' }}>
                      Produk baru akan langsung terbit di katalog belanja Dashboard Pelanggan.
                    </p>
                  </div>
                </div>

                <button onClick={() => setIsAddModalOpen(false)} className="btn-icon" style={{ background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Product Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Nama Produk Kopi *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Gayo Arabica Honey Process Limited"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Category & Origin */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Kategori *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Origin / Daerah Asal *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Aceh Tengah (Takengon)"
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                  </div>
                </div>

                {/* Process & Roast */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Proses Pasca-Panen *
                    </label>
                    <select
                      value={formData.process}
                      onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    >
                      <option value="Honey">Honey</option>
                      <option value="Wine">Wine</option>
                      <option value="Natural">Natural</option>
                      <option value="Washed">Washed</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Tingkat Roasting *
                    </label>
                    <select
                      value={formData.roast}
                      onChange={(e) => setFormData({ ...formData, roast: e.target.value })}
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Dark">Dark</option>
                    </select>
                  </div>
                </div>

                {/* Price, Stock, Weight */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Harga Jual (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Stok Awal (pcs) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Berat Satuan (g)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Flavor Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Flavor Notes (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    placeholder="Caramel, Chocolate, Floral, Fruity"
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    URL Gambar Produk
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Deskripsi Lengkap
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Jelaskan aroma, cita rasa, dan keistimewaan biji kopi ini..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(18, 15, 12, 0.8)',
                      border: '1px solid rgba(217, 119, 6, 0.25)',
                      borderRadius: 10,
                      padding: 12,
                      color: '#fcf9f2',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Featured Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255, 255, 255, 0.04)', padding: 12, borderRadius: 10 }}>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeatured" style={{ fontSize: '0.85rem', color: '#fcf9f2', cursor: 'pointer' }}>
                    Tandai sebagai <strong>Produk Pilihan / Rekomendasi Utama</strong> di Dashboard User
                  </label>
                </div>

                {/* Modal Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 16 }}>
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', borderColor: 'rgba(34, 197, 94, 0.5)' }}
                  >
                    <Check size={16} />
                    <span>Terbitkan ke Dashboard User</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 2: UPDATE (EDIT PRODUK KOPI)
          ========================================================================= */}
      <AnimatePresence>
        {isEditModalOpen && selectedCoffee && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 680,
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: 28,
                borderRadius: 20,
                border: '1.5px solid rgba(245, 158, 11, 0.4)',
                background: '#181412',
                zIndex: 310,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: '#d97706', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#120e09' }}>
                    <Edit2 size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: '#fcf9f2', margin: 0 }}>
                      Edit Produk: {selectedCoffee.name}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0 0' }}>
                      Perubahan yang Anda simpan akan seketika di-update di Dashboard Pelanggan.
                    </p>
                  </div>
                </div>

                <button onClick={() => setIsEditModalOpen(false)} className="btn-icon" style={{ background: 'transparent' }}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Product Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Nama Produk Kopi *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Category & Origin */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Kategori *
                    </label>
                    <select
                      value={formData.categoryId}
                      onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Origin / Daerah Asal *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    />
                  </div>
                </div>

                {/* Process & Roast */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Proses Pasca-Panen *
                    </label>
                    <select
                      value={formData.process}
                      onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                    >
                      <option value="Honey">Honey</option>
                      <option value="Wine">Wine</option>
                      <option value="Natural">Natural</option>
                      <option value="Washed">Washed</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Tingkat Roasting *
                    </label>
                    <select
                      value={formData.roast}
                      onChange={(e) => setFormData({ ...formData, roast: e.target.value })}
                    >
                      <option value="Light">Light</option>
                      <option value="Medium">Medium</option>
                      <option value="Dark">Dark</option>
                    </select>
                  </div>
                </div>

                {/* Price, Stock, Weight */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Harga Jual (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1000}
                      step={500}
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Stok Barang (pcs) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                      Berat Satuan (g)
                    </label>
                    <input
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                    />
                  </div>
                </div>

                {/* Flavor Notes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Flavor Notes (Pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={formData.flavor}
                    onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    URL Gambar Produk
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                {/* Description */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#d1c7bc', marginBottom: 6 }}>
                    Deskripsi Lengkap
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    style={{
                      width: '100%',
                      background: 'rgba(18, 15, 12, 0.8)',
                      border: '1px solid rgba(217, 119, 6, 0.25)',
                      borderRadius: 10,
                      padding: 12,
                      color: '#fcf9f2',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>

                {/* Featured Checkbox */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255, 255, 255, 0.04)', padding: 12, borderRadius: 10 }}>
                  <input
                    type="checkbox"
                    id="isFeaturedEdit"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    style={{ width: 18, height: 18, cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeaturedEdit" style={{ fontSize: '0.85rem', color: '#fcf9f2', cursor: 'pointer' }}>
                    Tandai sebagai <strong>Produk Pilihan / Rekomendasi Utama</strong> di Dashboard User
                  </label>
                </div>

                {/* Modal Action Buttons */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 12, borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 16 }}>
                  <button
                    type="button"
                    onClick={() => setIsEditModalOpen(false)}
                    className="btn btn-secondary"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, #d97706, #b45309)' }}
                  >
                    <Check size={16} />
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 3: DELETE (HAPUS PRODUK DARI DASHBOARD USER)
          ========================================================================= */}
      <AnimatePresence>
        {isDeleteModalOpen && selectedCoffee && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDeleteModalOpen(false)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 460,
                padding: 28,
                borderRadius: 20,
                border: '1.5px solid rgba(239, 68, 68, 0.4)',
                background: '#181412',
                zIndex: 310,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)',
                textAlign: 'center'
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: 'rgba(239, 68, 68, 0.2)',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Trash2 size={28} />
              </div>

              <h3 style={{ fontSize: '1.25rem', color: '#fcf9f2', margin: 0 }}>
                Hapus Produk dari Dashboard User?
              </h3>

              <p style={{ color: '#d1c7bc', fontSize: '0.88rem', marginTop: 10, lineHeight: 1.5 }}>
                Anda yakin ingin menghapus <strong style={{ color: '#fda4af' }}>{selectedCoffee.name}</strong>?
                Produk ini akan seketika dihilangkan dari katalog Dashboard User dan tidak dapat dibeli lagi.
              </p>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 24 }}>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ padding: '9px 20px' }}
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="btn btn-danger"
                  style={{ padding: '9px 20px' }}
                >
                  <Trash2 size={16} />
                  <span>Ya, Hapus Produk</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          MODAL 4: PREVIEW TAMPILAN USER (BAGAIMANA PRODUK TAMPIL DI DASHBOARD USER)
          ========================================================================= */}
      <AnimatePresence>
        {previewCoffee && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewCoffee(null)}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 380,
                padding: 24,
                borderRadius: 20,
                border: '1.5px solid rgba(245, 158, 11, 0.5)',
                background: '#161310',
                zIndex: 310,
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.9)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Eye size={14} /> Preview Tampilan Dashboard User
                </div>
                <button onClick={() => setPreviewCoffee(null)} className="btn-icon" style={{ background: 'transparent' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Card Thumbnail */}
              <div style={{ position: 'relative', width: '100%', height: 200, borderRadius: 14, overflow: 'hidden', marginBottom: 14 }}>
                <Image
                  src={previewCoffee.image}
                  alt={previewCoffee.name}
                  fill
                  sizes="380px"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', top: 10, left: 10, display: 'flex', gap: 6 }}>
                  <span className="badge badge-process-honey">{previewCoffee.process}</span>
                  <span className="badge badge-roast-medium"><Flame size={12} /> {previewCoffee.roast}</span>
                </div>
                <div style={{ position: 'absolute', bottom: 10, right: 10, background: 'rgba(0,0,0,0.7)', padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', color: '#86efac', fontWeight: 600 }}>
                  Stok: {previewCoffee.stock}
                </div>
              </div>

              {/* Info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontSize: '0.78rem', marginBottom: 6 }}>
                <MapPin size={13} /> {previewCoffee.origin}
              </div>

              <h4 className="font-serif" style={{ fontSize: '1.15rem', color: '#fcf9f2', margin: '0 0 8px 0' }}>
                {previewCoffee.name}
              </h4>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
                {(Array.isArray(previewCoffee.flavor) ? previewCoffee.flavor : [previewCoffee.flavor]).map((fl, idx) => (
                  <span key={idx} className="flavor-pill">{fl}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: '#9ca3af', display: 'block' }}>Mulai dari</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f59e0b' }}>
                    Rp{previewCoffee.price?.toLocaleString('id-ID')}
                  </span>
                </div>

                <span style={{ fontSize: '0.76rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: 8 }}>
                  Aktif di User
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
