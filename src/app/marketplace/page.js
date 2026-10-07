'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  MapPin,
  Flame,
  LayoutGrid,
  List,
  Coffee,
  Check,
  Plus,
  ShieldCheck,
  Edit2
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import ProductCard from '@/components/ProductCard';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { coffees, categories, currentUser } = useCoffee();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOrigin, setSelectedOrigin] = useState('all');
  const [selectedProcess, setSelectedProcess] = useState('all');
  const [selectedRoast, setSelectedRoast] = useState('all');
  const [selectedFlavor, setSelectedFlavor] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [maxPrice, setMaxPrice] = useState(150000);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Available options derived from data
  const origins = ['all', 'Aceh Tengah (Takengon)', 'Bener Meriah', 'Gayo Lues'];
  const processes = ['all', 'Honey', 'Wine', 'Natural', 'Washed'];
  const roasts = ['all', 'Light', 'Medium', 'Dark'];
  const flavors = ['all', 'Caramel', 'Chocolate', 'Fruity', 'Floral', 'Nutty', 'Honey', 'Sweet'];

  // Filter & Sort Logic
  const filteredCoffees = useMemo(() => {
    return coffees
      .filter(item => {
        // Search
        const matchesSearch =
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.flavor.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category
        const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;

        // Origin
        const matchesOrigin =
          selectedOrigin === 'all' ||
          item.origin.toLowerCase().includes(selectedOrigin.toLowerCase().replace(/ \(.+\)/, ''));

        // Process
        const matchesProcess = selectedProcess === 'all' || item.process.toLowerCase() === selectedProcess.toLowerCase();

        // Roast
        const matchesRoast = selectedRoast === 'all' || item.roast.toLowerCase() === selectedRoast.toLowerCase();

        // Flavor
        const matchesFlavor =
          selectedFlavor === 'all' ||
          item.flavor.some(f => f.toLowerCase() === selectedFlavor.toLowerCase());

        // Price
        const matchesPrice = item.price <= maxPrice;

        return matchesSearch && matchesCategory && matchesOrigin && matchesProcess && matchesRoast && matchesFlavor && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'reviews') return b.reviewCount - a.reviewCount;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0); // default 'recommended'
      });
  }, [coffees, searchQuery, selectedCategory, selectedOrigin, selectedProcess, selectedRoast, selectedFlavor, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedOrigin('all');
    setSelectedProcess('all');
    setSelectedRoast('all');
    setSelectedFlavor('all');
    setMaxPrice(150000);
    setSortBy('recommended');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'all' ||
    selectedOrigin !== 'all' ||
    selectedProcess !== 'all' ||
    selectedRoast !== 'all' ||
    selectedFlavor !== 'all' ||
    maxPrice < 150000;

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '36px 32px',
          marginBottom: 36,
          background: 'linear-gradient(135deg, rgba(32, 26, 21, 0.9) 0%, rgba(18, 14, 11, 0.8) 100%)',
          border: '1px solid rgba(217, 119, 6, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 650 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#f59e0b', fontSize: '0.82rem', fontWeight: 700, marginBottom: 8 }}>
            <Coffee size={15} />
            <span>KATALOG SPESIALTI DATARAN TINGGI GAYO</span>
          </div>
          <h1 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', color: '#fcf9f2', marginBottom: 10 }}>
            Marketplace Kopi Gayo
          </h1>
          <p style={{ color: '#d1c7bc', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            Saring dan temukan biji kopi Arabika Gayo berdasarkan origin perkebunan, metode pasca-panen (Honey, Wine, Washed, Natural), dan profil sangrai yang Anda sukai.
          </p>
        </div>
      </div>

      {/* Admin Quick CRUD Toolbar when logged in as Admin */}
      {currentUser?.role === 'admin' && (
        <div
          style={{
            padding: '16px 22px',
            borderRadius: 16,
            background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.3) 0%, rgba(20, 15, 14, 0.95) 100%)',
            border: '1.5px solid rgba(225, 29, 72, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 14,
            boxShadow: '0 8px 24px rgba(159, 18, 57, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #9f1239, #be123c)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(159, 18, 57, 0.4)'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontWeight: 800, color: '#fcf9f2', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>Mode Admin Aktif di Marketplace</span>
                <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 12, background: 'rgba(225, 29, 72, 0.3)', color: '#fda4af', border: '1px solid rgba(225, 29, 72, 0.5)' }}>
                  SUPER ADMIN
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#fda4af', marginTop: 2 }}>
                Semua kartu produk di bawah dilengkapi tombol <strong>CRUD</strong>. Untuk kontrol stok, edit, dan tambah produk baru, buka Dashboard Admin.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              href="/admin"
              className="btn btn-primary"
              style={{
                padding: '10px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #be123c, #9f1239)',
                border: '1px solid rgba(244, 63, 94, 0.6)',
                boxShadow: '0 4px 16px rgba(159, 18, 57, 0.4)',
                gap: 8
              }}
            >
              <Plus size={16} />
              <span>Buka Dashboard Admin (CRUD Lengkap) →</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Grid Layout: Filters on Left, Products on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '270px 1fr', gap: 32 }} className="marketplace-layout">
        {/* Left Filter Sidebar */}
        <aside
          className="glass-panel"
          style={{
            padding: 24,
            height: 'fit-content',
            position: 'sticky',
            top: 96,
            border: '1px solid rgba(217, 119, 6, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '1rem', color: '#fcf9f2' }}>
              <SlidersHorizontal size={18} color="#f59e0b" />
              <span>Filter Produk</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                style={{
                  fontSize: '0.78rem',
                  color: '#fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* 1. Kategori */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Kategori Kopi
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ fontSize: '0.88rem' }}
              >
                <option value="all">Semua Kategori</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* 2. Asal / Origin */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Daerah Origin
              </label>
              <select
                value={selectedOrigin}
                onChange={(e) => setSelectedOrigin(e.target.value)}
                style={{ fontSize: '0.88rem' }}
              >
                <option value="all">Semua Origin Gayo</option>
                <option value="Aceh Tengah">Aceh Tengah (Takengon)</option>
                <option value="Bener Meriah">Bener Meriah</option>
                <option value="Gayo Lues">Gayo Lues</option>
              </select>
            </div>

            {/* 3. Proses Pengolahan */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Proses Pasca Panen
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {processes.map(proc => (
                  <button
                    key={proc}
                    onClick={() => setSelectedProcess(proc)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: selectedProcess === proc ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedProcess === proc ? '#120e09' : '#d1c7bc',
                      border: selectedProcess === proc ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {proc === 'all' ? 'Semua' : proc}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Tingkat Roasting */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Tingkat Roasting
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {roasts.map(r => (
                  <button
                    key={r}
                    onClick={() => setSelectedRoast(r)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: 6,
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      background: selectedRoast === r ? '#f59e0b' : 'rgba(255, 255, 255, 0.05)',
                      color: selectedRoast === r ? '#120e09' : '#d1c7bc',
                      border: selectedRoast === r ? '1px solid #fbbf24' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    {r === 'all' ? 'Semua' : r}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Karakter Rasa / Flavor */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                Karakter Rasa (Flavor)
              </label>
              <select
                value={selectedFlavor}
                onChange={(e) => setSelectedFlavor(e.target.value)}
                style={{ fontSize: '0.88rem' }}
              >
                <option value="all">Semua Karakter Rasa</option>
                {flavors.filter(f => f !== 'all').map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* 6. Batas Harga Maksimum */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' }}>
                  Maks. Harga:
                </label>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b' }}>
                  Rp{maxPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <input
                type="range"
                min="70000"
                max="150000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                style={{ cursor: 'pointer', accentColor: '#f59e0b' }}
              />
            </div>
          </div>
        </aside>

        {/* Right Product Grid Area */}
        <div>
          {/* Top Bar: Search Input & Sort Selector */}
          <div
            className="glass-panel"
            style={{
              padding: '16px 20px',
              marginBottom: 24,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Search Bar */}
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search
                size={18}
                color="#9ca3af"
                style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Cari kopi, origin, aroma, atau deskripsi rasa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 42 }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '0.85rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 'auto', minWidth: 160, fontSize: '0.85rem' }}
              >
                <option value="recommended">Rekomendasi</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="reviews">Paling Banyak Diulas</option>
              </select>
            </div>
          </div>

          {/* Results Summary Count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, color: '#9ca3af', fontSize: '0.88rem' }}>
            <div>
              Menampilkan <strong style={{ color: '#fcf9f2' }}>{filteredCoffees.length}</strong> produk kopi Gayo
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredCoffees.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                padding: '60px 20px',
                textAlign: 'center',
                margin: '20px 0'
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  background: 'rgba(245, 158, 11, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <Search size={28} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#fcf9f2', marginBottom: 8 }}>
                Tidak Ada Produk yang Cocok
              </h3>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', maxWidth: 420, margin: '0 auto 20px' }}>
                Coba ubah kata kunci pencarian atau reset filter origin dan proses yang Anda pilih.
              </p>
              <button onClick={handleResetFilters} className="btn btn-outline-amber btn-sm">
                Reset Semua Filter
              </button>
            </div>
          ) : (
            <div className="grid-cards">
              {filteredCoffees.map(coffee => (
                <ProductCard key={coffee.id} coffee={coffee} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .marketplace-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center', color: '#f59e0b' }}>Memuat katalog kopi Gayo...</div>}>
      <MarketplaceContent />
    </Suspense>
  );
}
