'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { User, ShieldCheck, Coffee, ArrowRight, Lock } from 'lucide-react';

export default function GuestPrompt({ 
  title = "Login Diperlukan",
  message = "Silakan login terlebih dahulu untuk mengakses halaman ini",
  showAdminOption = false 
}) {
  return (
    <div 
      style={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px 24px'
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel"
        style={{
          maxWidth: '520px',
          width: '100%',
          padding: '48px 40px',
          textAlign: 'center',
          border: '1.5px solid rgba(245, 158, 11, 0.3)',
          background: 'rgba(28, 23, 19, 0.9)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.7)'
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: 80,
            height: 80,
            borderRadius: 20,
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.15) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            border: '2px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          <Lock size={40} color="#f59e0b" />
        </motion.div>

        {/* Title */}
        <h2 className="font-serif" style={{ fontSize: '2rem', marginBottom: 12, color: '#fcf9f2' }}>
          {title}
        </h2>

        {/* Message */}
        <p style={{ fontSize: '1rem', color: '#9ca3af', marginBottom: 32, lineHeight: 1.7 }}>
          {message}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Link
            href="/auth"
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '1rem',
              fontWeight: 700
            }}
          >
            <User size={20} />
            <span>Login sebagai Customer</span>
            <ArrowRight size={20} />
          </Link>

          {showAdminOption && (
            <Link
              href="/admin/login"
              className="btn btn-secondary"
              style={{
                width: '100%',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 700
              }}
            >
              <ShieldCheck size={20} color="#9f1239" />
              <span>Login sebagai Admin</span>
              <ArrowRight size={20} />
            </Link>
          )}

          <Link
            href="/"
            style={{
              marginTop: 8,
              fontSize: '0.9rem',
              color: '#9ca3af',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '8px'
            }}
          >
            <Coffee size={16} />
            <span>Kembali ke Homepage</span>
          </Link>
        </div>

        {/* Additional Info */}
        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            fontSize: '0.85rem',
            color: '#78716c'
          }}
        >
          <p style={{ margin: 0 }}>
            Belum punya akun?{' '}
            <Link href="/auth" style={{ color: '#f59e0b', fontWeight: 600 }}>
              Daftar sekarang
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
