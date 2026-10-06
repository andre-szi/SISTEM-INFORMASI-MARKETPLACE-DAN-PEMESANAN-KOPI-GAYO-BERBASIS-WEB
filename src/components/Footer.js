'use client';

import React from 'react';
import Link from 'next/link';
import { Coffee, MapPin, Award, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 'auto',
        backgroundColor: '#070605',
        borderTop: '1px solid rgba(217, 119, 6, 0.2)',
        paddingTop: 60,
        paddingBottom: 30
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40,
            marginBottom: 50
          }}
        >
          {/* Col 1: Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #f59e0b, #b45309)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Coffee size={20} color="#120e09" />
              </div>
              <span className="font-serif" style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fcf9f2' }}>
                KOPI GAYO MARKETPLACE
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: '#9ca3af', lineHeight: 1.6, marginBottom: 16 }}>
              Platform marketplace & pemesanan kopi otentik dataran tinggi Gayo. Menghubungkan langsung perkebunan kopi terbaik di Aceh Tengah dan Bener Meriah dengan para penikmat kopi spesialti di seluruh Indonesia.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                borderRadius: 8,
                background: 'rgba(245, 158, 11, 0.12)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: '#fbbf24',
                fontSize: '0.78rem',
                fontWeight: 600
              }}
            >
              <CheckCircle2 size={14} color="#10b981" /> Terjamin 100% Arabika Asli Gayo
            </div>
          </div>

          {/* Col 2: Kategori & Origin */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fcf9f2', marginBottom: 18, letterSpacing: '0.5px' }}>
              ORIGIN & PROSES GAYO
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem', color: '#a8a29e' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} color="#f59e0b" /> Aceh Tengah (Takengon, Pegasing)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={14} color="#f59e0b" /> Bener Meriah (Wih Pesam)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={14} color="#f59e0b" /> Honey & Anaerobic Natural
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={14} color="#f59e0b" /> Traditional Wine Fermentation
              </li>
            </ul>
          </div>

          {/* Col 3: Navigasi Sistem */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fcf9f2', marginBottom: 18, letterSpacing: '0.5px' }}>
              NAVIGASI
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.88rem' }}>
              <li>
                <Link href="/marketplace" style={{ color: '#d1c7bc', transition: 'color 0.2s' }}>
                  Katalog Kopi
                </Link>
              </li>
              <li>
                <Link href="/orders" style={{ color: '#d1c7bc', transition: 'color 0.2s' }}>
                  Pelacakan Pesanan
                </Link>
              </li>
              <li>
                <Link href="/cart" style={{ color: '#d1c7bc', transition: 'color 0.2s' }}>
                  Keranjang Belanja
                </Link>
              </li>
              <li>
                <Link href="/admin" style={{ color: '#d1c7bc', transition: 'color 0.2s' }}>
                  Panel Pengelola (Admin)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Jaminan Mutu Kopi */}
          <div>
            <h4 style={{ fontSize: '1rem', color: '#fcf9f2', marginBottom: 18, letterSpacing: '0.5px' }}>
              STANDAR KUALITAS
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: '0.85rem', color: '#9ca3af' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Shield size={18} color="#10b981" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>100% Arabika Asli Dataran Tinggi Gayo tanpa campuran.</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Award size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                <span>Roasting segar mingguan oleh roaster berpengalaman.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            fontSize: '0.82rem',
            color: '#78716c'
          }}
        >
          <div>
            © {new Date().getFullYear()} Kopi Gayo Marketplace. Semua Hak Cipta Dilindungi.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Highland Specialty Coffee Roasters</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
