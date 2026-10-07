'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Coffee, ShieldCheck, User, ArrowRight, Lock, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AuthPage() {
  const router = useRouter();
  const { login, currentUser } = useCoffee();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const res = login(email, password);
    if (res.success) {
      if (res.role === 'admin') {
        router.push('/admin'); // Redirect admin directly to Admin Dashboard
      } else {
        router.push('/dashboard'); // Redirect customer directly to User Dashboard
      }
    }
  };

  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      login('admin@kopigayo.id', 'admin123');
      router.push('/admin'); // Open Admin Dashboard directly
    } else {
      login('budi@mahasiswa.id', 'customer123');
      router.push('/dashboard'); // Open User Dashboard directly
    }
  };

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 60, minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel"
        style={{
          maxWidth: 500,
          width: '100%',
          padding: '36px 32px',
          border: '1px solid rgba(217, 119, 6, 0.3)',
          borderRadius: 24,
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 16,
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
              color: '#120e09',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Coffee size={28} />
          </div>
          <h1 className="font-serif" style={{ fontSize: '1.75rem', color: '#fcf9f2', marginBottom: 6 }}>
            {isRegister ? 'Daftar Akun Baru' : 'Pilih Akses Masuk Sistem'}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
            Sistem menyediakan 2 dashboard terpisah: <strong>Dashboard Pelanggan</strong> &amp; <strong>Dashboard Admin</strong>
          </p>
        </div>

        {/* 2 Separate Dashboard Quick Access Cards */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Sparkles size={14} /> Akses Cepat 2 Dashboard:
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
            {/* User Dashboard Access */}
            <button
              type="button"
              onClick={() => handleQuickLogin('customer')}
              className="btn btn-secondary btn-sm"
              style={{
                padding: '12px 14px',
                fontSize: '0.85rem',
                justifyContent: 'space-between',
                borderColor: 'rgba(245, 158, 11, 0.4)',
                background: 'rgba(245, 158, 11, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#120e09' }}>
                  <User size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fcf9f2' }}>Dashboard Pelanggan (User)</div>
                  <div style={{ fontSize: '0.74rem', color: '#9ca3af' }}>budi@mahasiswa.id • Keranjang &amp; Pesanan</div>
                </div>
              </div>
              <ArrowRight size={16} color="#fbbf24" />
            </button>

            {/* Admin Dashboard Access */}
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="btn btn-secondary btn-sm"
              style={{
                padding: '12px 14px',
                fontSize: '0.85rem',
                justifyContent: 'space-between',
                borderColor: 'rgba(225, 29, 72, 0.4)',
                background: 'rgba(159, 18, 57, 0.12)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left' }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #9f1239, #be123c)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: '#fda4af' }}>Dashboard Admin (Pengelola)</div>
                  <div style={{ fontSize: '0.74rem', color: '#fca5a5' }}>admin@kopigayo.id • CRUD &amp; Kontrol Stok</div>
                </div>
              </div>
              <ArrowRight size={16} color="#fda4af" />
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                Nama Lengkap:
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
              Alamat Email:
            </label>
            <input
              type="email"
              required
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
              Kata Sandi:
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: 8 }}>
            <span>{isRegister ? 'Daftar Sekarang' : 'Masuk Sekarang'}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div style={{ textAlign: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.85rem', color: '#9ca3af' }}>
          {isRegister ? (
            <span>
              Sudah memiliki akun?{' '}
              <button
                onClick={() => setIsRegister(false)}
                style={{ color: '#f59e0b', fontWeight: 700, cursor: 'pointer' }}
              >
                Masuk di sini
              </button>
            </span>
          ) : (
            <span>
              Belum memiliki akun?{' '}
              <button
                onClick={() => setIsRegister(true)}
                style={{ color: '#f59e0b', fontWeight: 700, cursor: 'pointer' }}
              >
                Daftar akun customer
              </button>
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
