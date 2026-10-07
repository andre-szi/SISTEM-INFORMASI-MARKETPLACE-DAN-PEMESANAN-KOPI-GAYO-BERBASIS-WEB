'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCoffee } from '@/context/CoffeeContext';
import {
  Coffee,
  ShoppingBag,
  ShieldCheck,
  User,
  Clock,
  Sparkles,
  Menu,
  X,
  LogOut,
  ChevronDown
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const {
    currentUser,
    switchRole,
    cartCount,
    setIsCartOpen,
    logout
  } = useCoffee();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isAdmin = currentUser?.role === 'admin';

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'rgba(10, 9, 7, 0.82)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(217, 119, 6, 0.15)',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--nav-height)' }}>
        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 18px rgba(245, 158, 11, 0.4)'
            }}
          >
            <Coffee size={24} color="#120e09" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="font-serif" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '0.5px' }}>
                KOPI GAYO
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: '#9ca3af', margin: 0, letterSpacing: '0.3px' }}>
              Highland Specialty Coffee
            </p>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav style={{ display: 'none', alignItems: 'center', gap: 24 }} className="desktop-nav">
          <Link
            href="/"
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: pathname === '/' ? '#f59e0b' : 'var(--text-secondary)',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            Beranda
          </Link>

          {/* Conditional Dashboard Link based on role */}
          {isAdmin ? (
            <Link
              href="/admin"
              style={{
                fontSize: '0.92rem',
                fontWeight: 700,
                color: pathname.startsWith('/admin') ? '#fda4af' : '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 14px',
                borderRadius: 10,
                background: pathname.startsWith('/admin') ? 'rgba(159, 18, 57, 0.3)' : 'rgba(159, 18, 57, 0.15)',
                border: '1px solid rgba(225, 29, 72, 0.45)',
                boxShadow: '0 2px 8px rgba(159, 18, 57, 0.25)'
              }}
            >
              <ShieldCheck size={16} color="#fda4af" />
              <span>Dashboard Admin</span>
            </Link>
          ) : (
            <Link
              href="/dashboard"
              style={{
                fontSize: '0.92rem',
                fontWeight: 600,
                color: pathname === '/dashboard' ? '#f59e0b' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <User size={16} />
              <span>Dashboard Pelanggan</span>
            </Link>
          )}

          <Link
            href="/marketplace"
            style={{
              fontSize: '0.92rem',
              fontWeight: 500,
              color: pathname.startsWith('/marketplace') ? '#f59e0b' : 'var(--text-secondary)',
              transition: 'color 0.2s ease'
            }}
          >
            Marketplace
          </Link>

          {!isAdmin ? (
            <Link
              href="/orders"
              style={{
                fontSize: '0.92rem',
                fontWeight: 500,
                color: pathname === '/orders' ? '#f59e0b' : 'var(--text-secondary)',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Clock size={16} />
              Pesanan Saya
            </Link>
          ) : (
            <Link
              href="/dashboard"
              style={{
                fontSize: '0.88rem',
                fontWeight: 500,
                color: pathname === '/dashboard' ? '#fbbf24' : '#9ca3af',
                transition: 'color 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 8,
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
              title="Lihat tampilan Dashboard Pelanggan"
            >
              <Coffee size={15} color="#fbbf24" />
              <span>Lihat Dashboard User</span>
            </Link>
          )}
        </nav>

        {/* Right Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          {/* Cart Trigger - Only show for customers */}
          {currentUser?.role !== 'admin' && (
            <button
              onClick={() => setIsCartOpen(true)}
              className="btn-icon"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(217, 119, 6, 0.2)',
                color: '#fcf9f2',
                position: 'relative'
              }}
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: -4,
                    right: -4,
                    background: '#f59e0b',
                    color: '#120e09',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* User Profile Menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 10px',
                borderRadius: 12,
                background: 'rgba(255, 255, 255, 0.05)',
                border: isAdmin ? '1px solid rgba(159, 18, 57, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fcf9f2',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  background: isAdmin ? 'linear-gradient(135deg, #9f1239, #be123c)' : 'linear-gradient(135deg, #d97706, #f59e0b)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  boxShadow: isAdmin ? '0 2px 10px rgba(159, 18, 57, 0.4)' : '0 2px 10px rgba(217, 119, 6, 0.3)'
                }}
              >
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <span style={{ fontSize: '0.85rem', maxWidth: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser?.name?.split(' ')[0] || 'Tamu'}
              </span>
              <ChevronDown size={14} color="#9ca3af" />
            </button>

            {profileDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: 240,
                  background: '#181512',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  borderRadius: 14,
                  boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
                  padding: 8,
                  zIndex: 200
                }}
              >
                <div style={{ padding: '8px 12px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fcf9f2' }}>
                    {currentUser?.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                    {currentUser?.email}
                  </div>
                  <div style={{ marginTop: 6 }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        padding: '3px 8px',
                        borderRadius: 6,
                        background: isAdmin ? 'rgba(159, 18, 57, 0.25)' : 'rgba(217, 119, 6, 0.25)',
                        color: isAdmin ? '#fda4af' : '#fbbf24',
                        border: isAdmin ? '1px solid rgba(159, 18, 57, 0.4)' : '1px solid rgba(217, 119, 6, 0.3)'
                      }}
                    >
                      {isAdmin ? '🛡️ Admin' : '👤 Customer'}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '4px 0' }}>
                  {!isAdmin && (
                    <>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          fontSize: '0.85rem',
                          color: '#fbbf24',
                          fontWeight: 600,
                          borderRadius: 8
                        }}
                      >
                        <User size={16} /> Dashboard Pelanggan
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          fontSize: '0.85rem',
                          color: '#d1c7bc',
                          borderRadius: 8
                        }}
                      >
                        <Clock size={16} /> Riwayat Pesanan
                      </Link>
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <Link
                        href="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          fontSize: '0.85rem',
                          color: '#fda4af',
                          fontWeight: 700,
                          borderRadius: 8
                        }}
                      >
                        <ShieldCheck size={16} /> Admin Dashboard (CRUD)
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 12px',
                          fontSize: '0.85rem',
                          color: '#fbbf24',
                          borderRadius: 8
                        }}
                      >
                        <Coffee size={16} /> Lihat Dashboard User
                      </Link>
                    </>
                  )}
                  {!isAdmin ? (
                    <a
                      href="/admin/login"
                      onClick={() => setProfileDropdownOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '8px 12px',
                        fontSize: '0.85rem',
                        color: '#fda4af',
                        borderRadius: 8
                      }}
                    >
                      <ShieldCheck size={16} /> Login Admin
                    </a>
                  ) : null}
                </div>
                
                <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 4, marginTop: 4 }}>
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      logout();
                      if (isAdmin) {
                        window.location.href = '/admin/login';
                      } else {
                        window.location.href = '/';
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 12px',
                      fontSize: '0.85rem',
                      color: '#fca5a5',
                      borderRadius: 8,
                      width: '100%',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <LogOut size={16} /> Keluar Akun
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'flex', color: '#fcf9f2' }}
            className="mobile-toggle"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            padding: '16px 24px 24px',
            backgroundColor: '#12100d',
            borderTop: '1px solid rgba(217, 119, 6, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
          >
            Beranda
          </Link>

          {isAdmin ? (
            <>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '1rem', color: '#fda4af', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <ShieldCheck size={18} /> Dashboard Admin
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                style={{ fontSize: '0.95rem', color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
              >
                <Coffee size={18} /> Lihat Dashboard User
              </Link>
            </>
          ) : (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', color: '#f59e0b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              <User size={18} /> Dashboard Pelanggan
            </Link>
          )}

          <Link
            href="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
          >
            Marketplace
          </Link>

          {!isAdmin && (
            <Link
              href="/orders"
              onClick={() => setMobileMenuOpen(false)}
              style={{ fontSize: '1rem', color: '#fcf9f2', fontWeight: 600 }}
            >
              Pesanan Saya
            </Link>
          )}
        </div>
      )}

      <style jsx>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
