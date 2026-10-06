'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  Truck,
  Package,
  CreditCard,
  QrCode,
  Star,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import GuestPrompt from '@/components/GuestPrompt';

export default function OrdersPage() {
  const {
    orders,
    currentUser,
    payOrder,
    completeOrder,
    setActiveProductModal,
    coffees
  } = useCoffee();

  // Protect orders page - only logged in customers
  if (!currentUser || currentUser.role === 'admin') {
    return (
      <GuestPrompt 
        title="Login Customer Diperlukan"
        message="Anda harus login sebagai customer untuk melihat riwayat pesanan Anda"
        showAdminOption={false}
      />
    );
  }

  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [payingOrderId, setPayingOrderId] = useState(null);

  // Filter orders for current user (or all if demo testing)
  const userOrders = orders.filter(ord => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'pending') return ord.status === 'Menunggu Pembayaran';
    if (filterStatus === 'processing') return ['Dikonfirmasi', 'Diproses', 'Dikirim'].includes(ord.status);
    if (filterStatus === 'completed') return ord.status === 'Selesai';
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Menunggu Pembayaran':
        return <span className="status-badge status-badge-pending"><Clock size={12} /> Menunggu Pembayaran</span>;
      case 'Dikonfirmasi':
        return <span className="status-badge status-badge-confirmed"><CheckCircle size={12} /> Dikonfirmasi</span>;
      case 'Diproses':
        return <span className="status-badge status-badge-processing"><Package size={12} /> Sedang Diproses</span>;
      case 'Dikirim':
        return <span className="status-badge status-badge-shipped"><Truck size={12} /> Dalam Pengiriman</span>;
      case 'Selesai':
        return <span className="status-badge status-badge-completed"><CheckCircle size={12} /> Pesanan Selesai</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Menunggu Pembayaran': return 10;
      case 'Dikonfirmasi': return 35;
      case 'Diproses': return 60;
      case 'Dikirim': return 85;
      case 'Selesai': return 100;
      default: return 0;
    }
  };

  const stages = [
    { title: 'Menunggu Pembayaran', key: 'Menunggu Pembayaran' },
    { title: 'Dikonfirmasi', key: 'Dikonfirmasi' },
    { title: 'Diproses', key: 'Diproses' },
    { title: 'Dikirim', key: 'Dikirim' },
    { title: 'Selesai', key: 'Selesai' }
  ];

  const handlePayNow = (orderId) => {
    payOrder(orderId);
    setPayingOrderId(null);
  };

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#fcf9f2', margin: 0 }}>
            Riwayat & Status Pesanan
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: 4 }}>
            Pantau tahapan pemrosesan biji kopi Gayo Anda secara real-time dari Takengon hingga sampai ke rumah Anda.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: 8, background: 'rgba(28, 23, 19, 0.6)', padding: 4, borderRadius: 12, border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {[
            { id: 'all', label: 'Semua Pesanan' },
            { id: 'pending', label: 'Perlu Dibayar' },
            { id: 'processing', label: 'Sedang Berjalan' },
            { id: 'completed', label: 'Selesai' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: '0.82rem',
                fontWeight: 600,
                background: filterStatus === tab.id ? '#f59e0b' : 'transparent',
                color: filterStatus === tab.id ? '#120e09' : '#d1c7bc',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {userOrders.length === 0 ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: 460, margin: '40px auto' }}>
          <ShoppingBag size={40} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#fcf9f2', marginBottom: 8 }}>Belum Ada Pesanan</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: 20 }}>
            Tidak ada riwayat transaksi pada filter status yang dipilih.
          </p>
          <Link href="/marketplace" className="btn btn-primary btn-sm">
            Eksplorasi Katalog Kopi
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {userOrders.map((order) => {
            const currentStageIndex = stages.findIndex(s => s.key === order.status);
            return (
              <div
                key={order.id}
                className="glass-panel"
                style={{
                  padding: 24,
                  border: '1px solid rgba(217, 119, 6, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20
                }}
              >
                {/* Order Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f59e0b' }}>
                      #{order.id}
                    </span>
                    <span style={{ color: '#78716c' }}>•</span>
                    <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>
                      {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span style={{ color: '#78716c' }}>•</span>
                    <span style={{ fontSize: '0.82rem', color: '#d1c7bc' }}>
                      Resi: <strong style={{ color: '#fbbf24' }}>{order.trackingNumber}</strong> ({order.courier})
                    </span>
                  </div>

                  <div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>

                {/* 5-Stage Visual Progress Bar */}
                <div style={{ padding: '0 10px' }}>
                  <div className="timeline-track">
                    <div className="timeline-line" />
                    <div
                      className="timeline-line-progress"
                      style={{ width: `${getProgressPercentage(order.status)}%` }}
                    />

                    {stages.map((stage, idx) => {
                      const isPast = idx < currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stage.key} className="timeline-step">
                          <div
                            className={`timeline-circle ${isPast ? 'completed' : isCurrent ? 'active' : ''}`}
                          >
                            {isPast ? <CheckCircle size={18} /> : idx + 1}
                          </div>
                          <span
                            style={{
                              fontSize: '0.75rem',
                              fontWeight: isCurrent ? 700 : 500,
                              color: isCurrent ? '#fbbf24' : isPast ? '#a7f3d0' : '#78716c',
                              textAlign: 'center',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {stage.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255, 255, 255, 0.02)', padding: 14, borderRadius: 12 }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ position: 'relative', width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                          <Image
                            src={item.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=100&q=80'}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fcf9f2' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            {item.grindSize} • {item.weight}g x {item.quantity}
                          </div>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, color: '#f59e0b', fontSize: '0.95rem' }}>
                          Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#78716c' }}>
                          @ Rp{item.price.toLocaleString('id-ID')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Actions & Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 6 }}>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: '#9ca3af', display: 'block' }}>
                      Metode Pembayaran: {order.payment?.method} ({order.payment?.status})
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fcf9f2' }}>
                      Total Tagihan: <span style={{ color: '#f59e0b' }}>Rp{order.totalAmount?.toLocaleString('id-ID')}</span>
                    </span>
                  </div>

                  {/* Contextual Action Buttons */}
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {order.status === 'Menunggu Pembayaran' && (
                      <button
                        onClick={() => setPayingOrderId(order.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '8px 16px' }}
                      >
                        <CreditCard size={14} />
                        <span>Bayar Sekarang (Simulasi)</span>
                      </button>
                    )}

                    {order.status === 'Dikirim' && (
                      <button
                        onClick={() => completeOrder(order.id)}
                        className="btn btn-primary btn-sm"
                        style={{ padding: '8px 16px', background: 'linear-gradient(135deg, #10b981, #059669)' }}
                      >
                        <CheckCircle size={14} />
                        <span>Konfirmasi Terima Pesanan</span>
                      </button>
                    )}

                    {order.status === 'Selesai' && order.items?.[0] && (
                      <button
                        onClick={() => {
                          const targetCoffee = coffees.find(c => c.id === order.items[0].coffeeId) || coffees[0];
                          setActiveProductModal(targetCoffee);
                        }}
                        className="btn btn-secondary btn-sm"
                      >
                        <Star size={14} color="#f59e0b" />
                        <span>Beri Ulasan Kopi</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOrderForInvoice(order)}
                      className="btn btn-secondary btn-sm"
                    >
                      <ExternalLink size={14} />
                      <span>Lihat Rincian / Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL SIMULASI PEMBAYARAN */}
      {payingOrderId && (
        <div className="modal-backdrop" style={{ zIndex: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-heavy"
            style={{ maxWidth: 460, width: '100%', borderRadius: 20, padding: 28, textAlign: 'center' }}
          >
            <h3 style={{ fontSize: '1.3rem', color: '#fcf9f2', marginBottom: 6 }}>
              Simulasi Pembayaran Instan
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 20 }}>
              Konfirmasi pembayaran untuk pesanan #{payingOrderId}
            </p>

            <div style={{ background: '#ffffff', width: 140, height: 140, borderRadius: 12, padding: 10, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <QrCode size={110} color="#120e09" />
            </div>

            <p style={{ fontSize: '0.85rem', color: '#d1c7bc', marginBottom: 24 }}>
              Klik tombol di bawah ini untuk mensimulasikan pembayaran berhasil. Status pesanan akan otomatis berubah menjadi <strong>Dikonfirmasi</strong>.
            </p>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setPayingOrderId(null)}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Batal
              </button>
              <button
                onClick={() => handlePayNow(payingOrderId)}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                Bayar Berhasil
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* MODAL INVOICE RINCIAN */}
      {selectedOrderForInvoice && (
        <div className="modal-backdrop" onClick={() => setSelectedOrderForInvoice(null)} style={{ zIndex: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-heavy"
            style={{ maxWidth: 580, width: '100%', borderRadius: 24, padding: 30, color: '#fcf9f2' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 16, marginBottom: 20 }}>
              <div>
                <h3 className="font-serif" style={{ fontSize: '1.35rem', margin: 0 }}>
                  Invoice Pemesanan Kopi Gayo
                </h3>
                <span style={{ fontSize: '0.82rem', color: '#f59e0b', fontWeight: 700 }}>
                  #{selectedOrderForInvoice.id}
                </span>
              </div>
              <div>{getStatusBadge(selectedOrderForInvoice.status)}</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: '0.85rem', marginBottom: 20 }}>
              <div>
                <span style={{ color: '#9ca3af', display: 'block' }}>Nama Pelanggan:</span>
                <strong>{selectedOrderForInvoice.customerName}</strong>
              </div>
              <div>
                <span style={{ color: '#9ca3af', display: 'block' }}>Nomor Resi:</span>
                <strong style={{ color: '#fbbf24' }}>{selectedOrderForInvoice.trackingNumber}</strong>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <span style={{ color: '#9ca3af', display: 'block' }}>Alamat Pengiriman:</span>
                <span>{selectedOrderForInvoice.shippingAddress}</span>
              </div>
            </div>

            {/* Items */}
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 14, marginBottom: 16 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 10 }}>
                Rincian Produk:
              </div>
              {selectedOrderForInvoice.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 8 }}>
                  <span>{item.name} ({item.grindSize}, {item.weight}g) x {item.quantity}</span>
                  <span style={{ fontWeight: 700 }}>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 12, display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                <span>Ongkos Kirim ({selectedOrderForInvoice.courier})</span>
                <span>Rp{selectedOrderForInvoice.shippingCost?.toLocaleString('id-ID')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, color: '#f59e0b', paddingTop: 8 }}>
                <span>Total Biaya</span>
                <span>Rp{selectedOrderForInvoice.totalAmount?.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'right' }}>
              <button onClick={() => setSelectedOrderForInvoice(null)} className="btn btn-secondary btn-sm">
                Tutup Invoice
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
