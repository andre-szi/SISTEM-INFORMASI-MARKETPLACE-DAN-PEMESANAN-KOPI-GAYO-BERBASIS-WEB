'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Coffee,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  Flame,
  Clock,
  HeartHandshake,
  CheckCircle2,
  Truck,
  Star,
  Users,
  Package,
  User
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const { coffees, categories, currentUser } = useCoffee();

  const featuredCoffees = coffees.filter(c => c.isFeatured).slice(0, 4);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Show welcome message for guests
  const isGuest = !currentUser;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 100, paddingBottom: 60 }}>
      {/* Guest Welcome Banner */}
      {isGuest && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: 'sticky',
            top: 'var(--nav-height)',
            zIndex: 50,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.95) 0%, rgba(217, 119, 6, 0.98) 100%)',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            borderBottom: '2px solid rgba(180, 83, 9, 0.5)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Sparkles size={20} color="#120e09" />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#120e09' }}>
              Selamat datang! Login untuk menikmati pengalaman berbelanja kopi yang lebih personal
            </span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link
              href="/auth"
              style={{
                padding: '6px 16px',
                background: '#120e09',
                color: '#fbbf24',
                borderRadius: 8,
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none'
              }}
            >
              <User size={16} />
              <span>Login / Daftar</span>
            </Link>
          </div>
        </motion.div>
      )}
      
      {/* 1. ENHANCED HERO SECTION */}
      <section style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', paddingTop: 60, overflow: 'hidden' }}>
        {/* Enhanced Glow ambient background effects */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: 500,
            background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.08) 40%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '5%',
            width: '40%',
            height: 350,
            background: 'radial-gradient(circle, rgba(159, 18, 57, 0.12) 0%, transparent 60%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 60, alignItems: 'center' }}>
            {/* Left Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Premium Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 20px',
                  borderRadius: 40,
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.08) 100%)',
                  border: '1.5px solid rgba(245, 158, 11, 0.35)',
                  color: '#fbbf24',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  marginBottom: 24,
                  boxShadow: '0 4px 16px rgba(245, 158, 11, 0.15)'
                }}
              >
                <Sparkles size={16} />
                <span>100% Specialty Arabica • Gayo Highland</span>
              </motion.div>

              {/* Hero Title - Enhanced */}
              <h1
                className="font-serif"
                style={{
                  fontSize: 'clamp(2.6rem, 6vw, 4.2rem)',
                  lineHeight: 1.12,
                  marginBottom: 24,
                  color: '#fcf9f2',
                  fontWeight: 800,
                  letterSpacing: '-0.02em'
                }}
              >
                Sensasi Kemewahan <br />
                <span className="text-gradient" style={{ display: 'inline-block', marginTop: 8 }}>
                  Aroma Kopi Gayo
                </span> <br />
                <span style={{ fontSize: '0.72em', fontWeight: 600, color: '#d1c7bc' }}>
                  Langsung dari Petani
                </span>
              </h1>

              {/* Enhanced Description */}
              <p
                style={{
                  fontSize: '1.08rem',
                  color: '#d1c7bc',
                  lineHeight: 1.75,
                  marginBottom: 36,
                  maxWidth: 580
                }}
              >
                Eksplorasi cita rasa kopi legendaris dari ketinggian <strong style={{ color: '#fbbf24' }}>1.400 - 1.800 mdpl</strong> Takengon & Bener Meriah. Pilihan proses <strong>Honey, Wine, Natural</strong> hingga <strong>Full Washed</strong> dengan jaminan sangrai segar mingguan.
              </p>

              {/* Enhanced CTA Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 48 }}>
                <Link href="/marketplace" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem', fontWeight: 700 }}>
                  <span>Jelajahi Katalog Kopi</span>
                  <ArrowRight size={20} />
                </Link>

                <Link
                  href="/orders"
                  className="btn btn-secondary"
                  style={{ padding: '16px 28px', fontSize: '1rem' }}
                >
                  <Clock size={19} color="#f59e0b" />
                  <span>Lacak Pesanan</span>
                </Link>
              </div>

              {/* Enhanced Trust Badges Grid */}
              <div 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: 20, 
                  borderTop: '1.5px solid rgba(245, 158, 11, 0.15)', 
                  paddingTop: 32,
                  marginTop: 8
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18) 0%, rgba(217, 119, 6, 0.12) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(245, 158, 11, 0.25)'
                  }}>
                    <MapPin size={20} color="#f59e0b" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fcf9f2' }}>Aceh Tengah</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>1.600+ mdpl</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.18) 0%, rgba(5, 150, 105, 0.12) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(16, 185, 129, 0.25)'
                  }}>
                    <ShieldCheck size={20} color="#10b981" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fcf9f2' }}>Grade 1</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Specialty</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ 
                    width: 42, 
                    height: 42, 
                    borderRadius: 12, 
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.18) 0%, rgba(14, 165, 233, 0.12) 100%)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    border: '1px solid rgba(56, 189, 248, 0.25)'
                  }}>
                    <Award size={20} color="#38bdf8" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fcf9f2' }}>Fresh Roasted</div>
                    <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Small Batch</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Hero Visual Card - Enhanced */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 30 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative' }}
            >
              {/* Floating decoration circles */}
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.25) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  zIndex: 0
                }}
              />
              
              <div
                className="glass-panel"
                style={{
                  position: 'relative',
                  borderRadius: 32,
                  overflow: 'hidden',
                  padding: 20,
                  border: '1.5px solid rgba(245, 158, 11, 0.35)',
                  boxShadow: '0 24px 70px rgba(0, 0, 0, 0.75), 0 0 50px rgba(217, 119, 6, 0.25)',
                  background: 'linear-gradient(135deg, rgba(28, 23, 19, 0.8) 0%, rgba(20, 16, 13, 0.9) 100%)'
                }}
              >
                <div style={{ position: 'relative', height: 480, borderRadius: 24, overflow: 'hidden' }}>
                  <Image
                    src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85"
                    alt="Kopi Gayo Pour Over"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(14, 12, 10, 0.98) 0%, rgba(14, 12, 10, 0.25) 55%, transparent 100%)'
                    }}
                  />

                  {/* Floating Micro-Card 1: Origin Note - Enhanced */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute',
                      top: 28,
                      left: 24,
                      background: 'rgba(18, 15, 12, 0.92)',
                      backdropFilter: 'blur(20px)',
                      border: '1.5px solid rgba(245, 158, 11, 0.35)',
                      borderRadius: 16,
                      padding: '12px 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)'
                    }}
                  >
                    <div 
                      style={{ 
                        width: 12, 
                        height: 12, 
                        borderRadius: '50%', 
                        background: '#10b981',
                        boxShadow: '0 0 12px rgba(16, 185, 129, 0.6)'
                      }} 
                    />
                    <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fcf9f2' }}>
                      Takengon Highland
                    </span>
                  </motion.div>

                  {/* Floating Micro-Card 2: Flavor Profile - Enhanced */}
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
                    style={{
                      position: 'absolute',
                      bottom: 28,
                      right: 24,
                      left: 24,
                      background: 'rgba(18, 15, 12, 0.95)',
                      backdropFilter: 'blur(20px)',
                      border: '1.5px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 20,
                      padding: '20px 24px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <span style={{ 
                        fontSize: '0.8rem', 
                        color: '#fbbf24', 
                        fontWeight: 800, 
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        <Star size={14} fill="#fbbf24" />
                        Top Pick
                      </span>
                      <span style={{ 
                        fontSize: '0.76rem', 
                        color: '#86efac', 
                        background: 'rgba(34, 197, 94, 0.18)', 
                        padding: '4px 10px', 
                        borderRadius: 6,
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        fontWeight: 600
                      }}>
                        ● Stok Tersedia
                      </span>
                    </div>
                    <div style={{ fontSize: '1.12rem', fontWeight: 800, color: '#fcf9f2', marginBottom: 6 }}>
                      Gayo Highland Wine Process
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#d1c7bc', lineHeight: 1.5 }}>
                      Fermentasi 45 hari • Blackcurrant • Floral • Aroma anggur matang
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1.5 STATS SECTION - NEW */}
      <section className="container" style={{ marginTop: -40 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel"
          style={{
            padding: '40px 32px',
            background: 'linear-gradient(135deg, rgba(28, 23, 19, 0.85) 0%, rgba(20, 16, 13, 0.95) 100%)',
            border: '1.5px solid rgba(245, 158, 11, 0.25)',
            borderRadius: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 32,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              500+
            </div>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>
              Pelanggan Setia
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #86efac 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              1,000+
            </div>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>
              Pesanan Berhasil
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #7dd3fc 0%, #0284c7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              4.9
            </div>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>
              Rating Bintang
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '2.8rem', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #fda4af 0%, #9f1239 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              20+
            </div>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af', fontWeight: 600 }}>
              Varian Kopi
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. ENHANCED CATEGORIES PREVIEW */}
      <section className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 50px' }}
        >
          <span style={{ 
            fontSize: '0.82rem', 
            color: '#f59e0b', 
            fontWeight: 800, 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            EKSPLORASI KOLEKSI
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: 12, marginBottom: 16, fontWeight: 800 }}>
            Kategori Kopi Unggulan
          </h2>
          <p style={{ fontSize: '1rem', color: '#9ca3af', lineHeight: 1.7 }}>
            Temukan karakter rasa yang sesuai dengan metode seduh manual brew maupun espresso machine Anda.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24 }}
        >
          {categories.map((cat, idx) => (
            <motion.div key={cat.id} variants={fadeInUp}>
              <Link
                href={`/marketplace?category=${cat.id}`}
                className="glass-panel glass-panel-hover"
                style={{
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  border: '1.5px solid rgba(217, 119, 6, 0.18)',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 14,
                    background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b',
                    border: '1px solid rgba(245, 158, 11, 0.3)'
                  }}
                >
                  <Coffee size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fcf9f2' }}>
                  {cat.name}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {cat.description}
                </p>
                <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontSize: '0.88rem', fontWeight: 700 }}>
                  <span>Lihat Produk</span>
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. ENHANCED FEATURED PRODUCTS SECTION */}
      <section className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 44, flexWrap: 'wrap', gap: 20 }}
        >
          <div>
            <div style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
              PILIHAN KOLEKSI TERBAIK
            </div>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', color: '#fcf9f2', margin: 0, fontWeight: 800 }}>
              Kopi Gayo Terpopuler
            </h2>
          </div>

          <Link href="/marketplace" className="btn btn-outline-amber" style={{ padding: '12px 24px', fontSize: '0.95rem', fontWeight: 700 }}>
            <span>Lihat Semua ({coffees.length} Produk)</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid-cards"
        >
          {featuredCoffees.map((coffee) => (
            <motion.div key={coffee.id} variants={fadeInUp}>
              <ProductCard coffee={coffee} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. ENHANCED TASTE & PROCESS GUIDE */}
      <section
        style={{
          background: 'linear-gradient(180deg, rgba(28, 23, 19, 0.85) 0%, rgba(14, 11, 9, 0.98) 100%)',
          borderTop: '1.5px solid rgba(217, 119, 6, 0.25)',
          borderBottom: '1.5px solid rgba(217, 119, 6, 0.25)',
          padding: '80px 0',
          position: 'relative'
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', maxWidth: 750, margin: '0 auto 60px' }}
          >
            <span style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              PANDUAN KARAKTERISTIK KOPI GAYO
            </span>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: 12, marginBottom: 18, fontWeight: 800 }}>
              Memahami Perbedaan Proses Pasca-Panen
            </h2>
            <p style={{ color: '#d1c7bc', fontSize: '1rem', lineHeight: 1.7 }}>
              Setiap metode pengolahan memberikan keunikan profil rasa yang berbeda pada biji kopi Arabika Gayo.
            </p>
          </motion.div>

          {/* Enhanced Process Grid */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, marginBottom: 40 }}
          >
            {/* Wine Process */}
            <motion.div variants={fadeInUp} className="glass-panel" style={{ padding: 28, borderTop: '3px solid #fda4af' }}>
              <span className="badge badge-process-wine" style={{ marginBottom: 16, fontSize: '0.78rem' }}>
                Wine Fermentation
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 12, color: '#fcf9f2', fontWeight: 800 }}>
                Aroma Buah Eksotis & Anggur
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.7 }}>
                Fermentasi anaerobik 30-45 hari dalam tabung tertutup. Menghasilkan rasa manis buah anggur merah pekat, acidity cerah menyenangkan, tanpa alkohol.
              </p>
            </motion.div>

            {/* Honey Process */}
            <motion.div variants={fadeInUp} className="glass-panel" style={{ padding: 28, borderTop: '3px solid #fde047' }}>
              <span className="badge badge-process-honey" style={{ marginBottom: 16, fontSize: '0.78rem' }}>
                Honey Process
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 12, color: '#fcf9f2', fontWeight: 800 }}>
                Rasa Manis Karamel Alami
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.7 }}>
                Kulit buah dikupas namun lendir manis (mucilage) dibiarkan melekat saat pengeringan. Menghasilkan aftertaste madu yang manis dan body sirup lembut.
              </p>
            </motion.div>

            {/* Natural Process */}
            <motion.div variants={fadeInUp} className="glass-panel" style={{ padding: 28, borderTop: '3px solid #86efac' }}>
              <span className="badge badge-process-natural" style={{ marginBottom: 16, fontSize: '0.78rem' }}>
                Natural Sun-Dried
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 12, color: '#fcf9f2', fontWeight: 800 }}>
                Heavy Body & Strawberry
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.7 }}>
                Ceri kopi dijemur utuh di bawah sinar matahari. Gula alami terserap ke dalam biji menghasilkan aroma berry manis dan ketebalan rasa yang mantap.
              </p>
            </motion.div>

            {/* Full Washed */}
            <motion.div variants={fadeInUp} className="glass-panel" style={{ padding: 28, borderTop: '3px solid #7dd3fc' }}>
              <span className="badge badge-process-washed" style={{ marginBottom: 16, fontSize: '0.78rem' }}>
                Full Washed Classic
              </span>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 12, color: '#fcf9f2', fontWeight: 800 }}>
                Clean Cup & Sentuhan Cokelat
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#9ca3af', lineHeight: 1.7 }}>
                Dicuci bersih dengan air pegunungan dingin. Menghadirkan karakter murni kopi Gayo klasik: acidity jeruk keprok yang segar dengan aroma dark chocolate.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 5. ENHANCED 5-STEP ORDER PIPELINE */}
      <section className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 50px' }}
        >
          <span style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ALUR PEMESANAN PRAKTIS & REAL-TIME
          </span>
          <h2 className="font-serif" style={{ fontSize: '2.4rem', marginTop: 12, marginBottom: 16, fontWeight: 800 }}>
            5 Tahap Status Pemesanan Terintegrasi
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '1rem', lineHeight: 1.7 }}>
            Sistem melacak setiap tahapan secara transparan antara Customer dan Admin.
          </p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}
        >
          {[
            { step: '1', title: 'Menunggu Pembayaran', desc: 'Simulasi QRIS / Virtual Account bank dengan timer dan kode unik transaksi.', color: '#fde047' },
            { step: '2', title: 'Dikonfirmasi', desc: 'Admin menerima verifikasi dana dan menyiapkan instruksi roasting biji kopi.', color: '#7dd3fc' },
            { step: '3', title: 'Diproses', desc: 'Biji kopi digiling sesuai request (Biji Utuh / V60 / Espresso) dan dikemas rapat.', color: '#d8b4fe' },
            { step: '4', title: 'Dikirim', desc: 'Paket diserahkan ke kurir (JNE / J&T / SiCepat) dilengkapi nomor resi resmi.', color: '#fdba74' },
            { step: '5', title: 'Selesai', desc: 'Kopi tiba di alamat pembeli, siap dinikmati dan dapat diberikan ulasan bintang.', color: '#86efac' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="glass-panel"
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                position: 'relative',
                border: '1.5px solid rgba(245, 158, 11, 0.18)'
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${item.color}, ${item.color}dd)`,
                  color: '#0a0907',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 900,
                  fontSize: '1.1rem',
                  boxShadow: `0 4px 16px ${item.color}55`
                }}
              >
                {item.step}
              </div>
              <h4 style={{ fontSize: '1.08rem', fontWeight: 800, color: '#fcf9f2' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 6. ENHANCED CALL TO ACTION BANNER */}
      <section className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{
            padding: '60px 48px',
            background: 'radial-gradient(ellipse at 100% 0%, rgba(245, 158, 11, 0.28) 0%, rgba(20, 16, 13, 0.98) 65%)',
            border: '1.5px solid rgba(245, 158, 11, 0.4)',
            borderRadius: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 36,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(245, 158, 11, 0.2)'
          }}
        >
          {/* Decorative circles */}
          <div
            style={{
              position: 'absolute',
              top: '-80px',
              right: '-80px',
              width: '250px',
              height: '250px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)',
              filter: 'blur(40px)'
            }}
          />
          
          <div style={{ maxWidth: 680, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fbbf24', fontSize: '0.9rem', fontWeight: 800, marginBottom: 16 }}>
              <Coffee size={20} />
              <span>Specialty Coffee Roastery & Marketplace</span>
            </div>
            <h2 className="font-serif" style={{ fontSize: '2.4rem', marginBottom: 18, color: '#fcf9f2', fontWeight: 800, lineHeight: 1.25 }}>
              Siap Menikmati Kesegaran Kopi Gayo Asli?
            </h2>
            <p style={{ color: '#d1c7bc', fontSize: '1.02rem', lineHeight: 1.75, margin: 0 }}>
              Pesan sekarang dan nikmati seduhan kopi beraroma mewah dengan tingkat gilingan yang disesuaikan secara presisi untuk metode seduh favorit Anda.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', zIndex: 1 }}>
            <Link href="/marketplace" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem', fontWeight: 700 }}>
              <span>Buka Marketplace</span>
              <ArrowRight size={20} />
            </Link>
            
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d1c7bc', fontSize: '0.85rem' }}>
                <Truck size={16} color="#10b981" />
                <span>Gratis Ongkir</span>
              </div>
              <div style={{ width: 1, height: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d1c7bc', fontSize: '0.85rem' }}>
                <ShieldCheck size={16} color="#38bdf8" />
                <span>100% Original</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
