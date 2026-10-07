'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Flame, MapPin, Edit2, ShieldCheck } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function ProductCard({ coffee }) {
  const { addToCart, setActiveProductModal, wishlist, toggleWishlist, currentUser } = useCoffee();
  const isAdmin = currentUser?.role === 'admin';

  const isLiked = wishlist.includes(coffee.id);

  // Helper for process badge styling
  const getProcessClass = (proc) => {
    switch (proc?.toLowerCase()) {
      case 'wine': return 'badge-process-wine';
      case 'honey': return 'badge-process-honey';
      case 'natural': return 'badge-process-natural';
      default: return 'badge-process-washed';
    }
  };

  const getRoastClass = (rst) => {
    switch (rst?.toLowerCase()) {
      case 'light': return 'badge-roast-light';
      case 'dark': return 'badge-roast-dark';
      default: return 'badge-roast-medium';
    }
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(coffee, 'Biji Utuh', 200, 1);
  };

  const handleToggleLike = (e) => {
    e.stopPropagation();
    toggleWishlist(coffee.id);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      onClick={() => setActiveProductModal(coffee)}
      className="glass-panel"
      style={{
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
        border: '1px solid rgba(217, 119, 6, 0.18)'
      }}
    >
      {/* Image Container with Badges */}
      <div style={{ position: 'relative', width: '100%', height: 210, overflow: 'hidden' }}>
        <Image
          src={coffee.image}
          alt={coffee.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="product-card-image"
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(10, 9, 7, 0.8) 0%, rgba(10, 9, 7, 0.1) 60%, transparent 100%)'
          }}
        />

        {/* Process & Roast Badges */}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <span className={`badge ${getProcessClass(coffee.process)}`}>
            {coffee.process}
          </span>
          <span className={`badge ${getRoastClass(coffee.roast)}`}>
            <Flame size={12} /> {coffee.roast}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleLike}
          aria-label="Wishlist"
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'rgba(18, 15, 12, 0.75)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isLiked ? '#ef4444' : '#fcf9f2',
            transition: 'all 0.2s ease'
          }}
        >
          <Heart size={16} fill={isLiked ? '#ef4444' : 'none'} />
        </button>

        {/* Stock / Rating pill */}
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#fef3c7', fontWeight: 600 }}>
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{coffee.rating}</span>
            <span style={{ color: '#9ca3af' }}>({coffee.reviewCount})</span>
          </div>

          <span
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              padding: '2px 8px',
              borderRadius: 6,
              color: coffee.stock <= 5 ? '#fca5a5' : '#86efac',
              fontWeight: 600,
              fontSize: '0.72rem'
            }}
          >
            Stok: {coffee.stock}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Origin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontSize: '0.78rem', marginBottom: 6 }}>
          <MapPin size={13} />
          <span>{coffee.origin}</span>
        </div>

        {/* Coffee Name */}
        <h3
          className="font-serif"
          style={{
            fontSize: '1.08rem',
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: 8,
            color: '#fcf9f2',
            minHeight: '2.7em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {coffee.name}
        </h3>

        {/* Flavor Notes */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 16 }}>
          {coffee.flavor?.slice(0, 3).map((f, i) => (
            <span key={i} className="flavor-pill">
              {f}
            </span>
          ))}
          {coffee.flavor?.length > 3 && (
            <span className="flavor-pill">+{coffee.flavor.length - 3}</span>
          )}
        </div>

        {/* Price & Action */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 12,
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <div>
            <span style={{ fontSize: '0.72rem', color: '#9ca3af', display: 'block' }}>Mulai dari</span>
            <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f59e0b' }}>
              Rp{coffee.price?.toLocaleString('id-ID')}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#78716c', marginLeft: 4 }}>/200g</span>
          </div>

          {isAdmin ? (
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <Link
                href="/admin"
                onClick={(e) => e.stopPropagation()}
                className="btn btn-secondary"
                style={{
                  padding: '7px 10px',
                  fontSize: '0.78rem',
                  borderColor: 'rgba(225, 29, 72, 0.5)',
                  color: '#fda4af',
                  background: 'rgba(159, 18, 57, 0.25)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                title="Kelola & Edit produk ini di Dashboard Admin (CRUD)"
              >
                <Edit2 size={13} color="#fda4af" />
                <span>CRUD</span>
              </Link>
              <button
                onClick={handleQuickAdd}
                className="btn btn-primary"
                style={{
                  padding: '7px 10px',
                  fontSize: '0.78rem',
                  borderRadius: 8,
                  gap: 4
                }}
                title="Pesan sebagai sampel / tes"
              >
                <ShoppingBag size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="btn btn-primary"
              style={{
                padding: '8px 14px',
                fontSize: '0.82rem',
                borderRadius: 10,
                gap: 6
              }}
              title="Tambah ke keranjang"
            >
              <ShoppingBag size={15} />
              <span>Pesan</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .product-card-image:hover {
          transform: scale(1.06);
        }
      `}</style>
    </motion.div>
  );
}
