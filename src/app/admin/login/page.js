'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCoffee } from '@/context/CoffeeContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, Coffee } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, currentUser, isAdminAuthenticated } = useCoffee();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (currentUser?.role === 'admin' && isAdminAuthenticated()) {
      router.push('/admin');
    }
  }, [currentUser, isAdminAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate fields
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi!');
      setIsLoading(false);
      return;
    }

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const result = login(formData.email, formData.password);
    
    if (result.success && result.role === 'admin') {
      router.push('/admin');
    } else {
      setError('Email atau password salah! Gunakan: admin@kopigayo.id / admin123');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '24px',
        background: 'radial-gradient(circle at 50% 20%, rgba(159, 18, 57, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), var(--bg-primary)',
        position: 'relative'
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(159, 18, 57, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 70,
                height: 70,
                borderRadius: 18,
                background: 'linear-gradient(135deg, #9f1239 0%, #be123c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 28px rgba(159, 18, 57, 0.4)',
                border: '2px solid rgba(159, 18, 57, 0.3)'
              }}
            >
              <ShieldCheck size={36} color="#fff" />
            </div>
          </div>
          
          <h1 className="font-serif" style={{ fontSize: '2rem', marginBottom: 8, fontWeight: 800 }}>
            Admin Dashboard
          </h1>
          <p style={{ fontSize: '0.95rem', color: '#9ca3af' }}>
            Sistem Manajemen Kopi Gayo Marketplace
          </p>
        </div>

        {/* Login Form Card */}
        <div 
          className="glass-panel"
          style={{
            padding: '40px 36px',
            border: '1.5px solid rgba(159, 18, 57, 0.3)',
            background: 'rgba(28, 23, 19, 0.85)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Error Alert */}
            {error && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: 10,
                  color: '#fca5a5',
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  marginBottom: 8, 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  color: '#d1c7bc'
                }}
              >
                Email Admin
              </label>
              <div style={{ position: 'relative' }}>
                <Mail 
                  size={18} 
                  style={{ 
                    position: 'absolute', 
                    left: 14, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} 
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@kopigayo.id"
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 44px',
                    fontSize: '0.95rem',
                    background: 'rgba(20, 16, 13, 0.8)',
                    border: '1px solid rgba(159, 18, 57, 0.3)',
                    borderRadius: 10,
                    color: '#fcf9f2'
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block', 
                  marginBottom: 8, 
                  fontSize: '0.9rem', 
                  fontWeight: 600,
                  color: '#d1c7bc'
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock 
                  size={18} 
                  style={{ 
                    position: 'absolute', 
                    left: 14, 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '12px 44px 12px 44px',
                    fontSize: '0.95rem',
                    background: 'rgba(20, 16, 13, 0.8)',
                    border: '1px solid rgba(159, 18, 57, 0.3)',
                    borderRadius: 10,
                    color: '#fcf9f2'
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    display: 'flex',
                    alignItems: 'center',
                    color: '#9ca3af'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Demo Credentials Info */}
            <div
              style={{
                padding: '12px 16px',
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                borderRadius: 10,
                fontSize: '0.82rem',
                color: '#fbbf24'
              }}
            >
              <strong>Demo Credentials:</strong>
              <div style={{ marginTop: 4, color: '#d1c7bc' }}>
                Email: admin@kopigayo.id<br />
                Password: admin123
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 700,
                background: isLoading 
                  ? 'rgba(159, 18, 57, 0.5)' 
                  : 'linear-gradient(135deg, #9f1239 0%, #be123c 100%)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <span>Memproses...</span>
              ) : (
                <>
                  <ShieldCheck size={20} />
                  <span>Login sebagai Admin</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Customer Link */}
          <div style={{ marginTop: 24, textAlign: 'center', paddingTop: 24, borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <a 
              href="/" 
              style={{ 
                fontSize: '0.88rem', 
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8
              }}
            >
              <Coffee size={16} />
              <span>Kembali ke Halaman Customer</span>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.82rem', color: '#78716c' }}>
          <p>Sistem Informasi Kopi Gayo Marketplace</p>
          <p style={{ marginTop: 4 }}>© 2026 - Aceh Highland Specialty Coffee</p>
        </div>
      </div>
    </div>
  );
}
