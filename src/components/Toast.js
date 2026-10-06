'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCoffee } from '@/context/CoffeeContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toasts } = useCoffee();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        pointerEvents: 'none',
        maxWidth: 380,
        width: '100%'
      }}
    >
      <AnimatePresence>
        {toasts.map(toast => {
          let Icon = CheckCircle2;
          let iconColor = '#10b981';
          let borderColor = 'rgba(16, 185, 129, 0.3)';

          if (toast.type === 'error') {
            Icon = AlertCircle;
            iconColor = '#ef4444';
            borderColor = 'rgba(239, 68, 68, 0.3)';
          } else if (toast.type === 'info') {
            Icon = Info;
            iconColor = '#f59e0b';
            borderColor = 'rgba(245, 158, 11, 0.3)';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                background: 'rgba(24, 20, 16, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${borderColor}`,
                borderRadius: 14,
                padding: '12px 18px',
                color: '#fcf9f2',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.65), 0 0 15px rgba(245, 158, 11, 0.15)',
                pointerEvents: 'auto',
                fontSize: '0.9rem',
                lineHeight: 1.4
              }}
            >
              <Icon size={20} color={iconColor} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1 }}>{toast.message}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
