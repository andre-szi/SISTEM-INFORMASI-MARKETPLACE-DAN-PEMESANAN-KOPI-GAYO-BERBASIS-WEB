'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Coffee,
  Tags,
  ShoppingBag,
  Users,
  BarChart3,
  ShieldCheck,
  LogOut,
  Home
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, isAdminAuthenticated, logout } = useCoffee();

  // Protect all admin routes except login
  useEffect(() => {
    if (pathname !== '/admin/login') {
      if (!currentUser || currentUser.role !== 'admin' || !isAdminAuthenticated()) {
        router.push('/admin/login');
      }
    }
  }, [currentUser, isAdminAuthenticated, pathname, router]);

  // Don't show layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Show loading if checking auth
  if (!currentUser || currentUser.role !== 'admin' || !isAdminAuthenticated()) {
    return (
      <div style={{ 
        minHeight: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16
      }}>
        <ShieldCheck size={48} color="#9f1239" />
        <p style={{ fontSize: '1.1rem', color: '#9ca3af' }}>Memeriksa autentikasi admin...</p>
      </div>
    );
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Kelola Produk Kopi', href: '/admin/products', icon: Coffee },
    { label: 'Kelola Kategori', href: '/admin/categories', icon: Tags },
    { label: 'Kelola Pesanan', href: '/admin/orders', icon: ShoppingBag },
    { label: 'Data Pelanggan', href: '/admin/customers', icon: Users },
    { label: 'Laporan Penjualan', href: '/admin/reports', icon: BarChart3 }
  ];

  return (
    <div className="container" style={{ paddingTop: 24, paddingBottom: 60 }}>
      {/* Top Banner Notice - Enhanced */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
          padding: '14px 24px',
          borderRadius: 16,
          background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.2) 0%, rgba(127, 29, 29, 0.15) 100%)',
          border: '1.5px solid rgba(225, 29, 72, 0.35)',
          marginBottom: 28,
          color: '#fda4af',
          boxShadow: '0 4px 16px rgba(159, 18, 57, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '0.9rem' }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #9f1239, #be123c)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(159, 18, 57, 0.4)'
            }}
          >
            <ShieldCheck size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#fcf9f2', marginBottom: 2 }}>
              Admin Panel - {currentUser?.name}
            </div>
            <div style={{ fontSize: '0.78rem', color: '#fca5a5' }}>
              Sistem Manajemen Kopi Gayo Marketplace
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link
            href="/dashboard"
            className="btn btn-secondary btn-sm"
            style={{
              padding: '7px 16px',
              fontSize: '0.82rem',
              borderColor: 'rgba(245, 158, 11, 0.4)',
              color: '#fbbf24'
            }}
          >
            <Coffee size={15} />
            <span>Buka Dashboard User</span>
          </Link>
          <Link
            href="/"
            className="btn btn-secondary btn-sm"
            style={{ padding: '7px 16px', fontSize: '0.82rem' }}
          >
            <Home size={15} />
            <span>Ke Beranda</span>
          </Link>
          <button
            onClick={() => {
              logout();
              router.push('/admin/login');
            }}
            className="btn btn-danger btn-sm"
            style={{ padding: '7px 16px', fontSize: '0.82rem' }}
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Admin Grid: Sidebar & Main Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }} className="admin-grid-layout">
        {/* Enhanced Sidebar */}
        <aside
          className="glass-panel"
          style={{
            padding: 20,
            height: 'fit-content',
            position: 'sticky',
            top: 96,
            border: '1.5px solid rgba(159, 18, 57, 0.3)',
            background: 'rgba(28, 23, 19, 0.85)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
          }}
        >
          <div style={{ padding: '10px 14px 18px', borderBottom: '1.5px solid rgba(159, 18, 57, 0.25)', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #9f1239, #be123c)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldCheck size={22} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fcf9f2', letterSpacing: '0.3px' }}>
                  ADMIN PANEL
                </div>
                <div style={{ fontSize: '0.72rem', color: '#fca5a5', marginTop: 2 }}>
                  Management System
                </div>
              </div>
            </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '11px 16px',
                    borderRadius: 12,
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#120e09' : '#d1c7bc',
                    background: isActive 
                      ? 'linear-gradient(135deg, #9f1239, #be123c)' 
                      : 'transparent',
                    border: isActive ? '1px solid rgba(159, 18, 57, 0.5)' : '1px solid transparent',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? '0 4px 12px rgba(159, 18, 57, 0.3)' : 'none'
                  }}
                  className="sidebar-link"
                >
                  <Icon size={19} color={isActive ? '#fff' : '#9ca3af'} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Content Body */}
        <main>{children}</main>
      </div>

      <style jsx>{`
        .sidebar-link:hover {
          background: rgba(159, 18, 57, 0.15) !important;
          border-color: rgba(159, 18, 57, 0.3) !important;
        }
        
        @media (max-width: 900px) {
          .admin-grid-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
