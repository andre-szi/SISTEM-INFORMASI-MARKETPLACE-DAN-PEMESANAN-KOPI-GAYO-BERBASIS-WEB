'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  Coffee,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  BarChart3,
  Users
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { coffees, orders, currentUser, isAdminAuthenticated, updateOrderStatus } = useCoffee();

  // Protect admin route - redirect if not authenticated
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin' || !isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [currentUser, isAdminAuthenticated, router]);

  // Show loading while checking auth
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

  // Calculate Metrics
  const totalRevenue = orders
    .filter(o => o.payment.status === 'Paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const lowStockCoffees = coffees.filter(c => c.stock <= 15);

  const statusCounts = {
    pending: orders.filter(o => o.status === 'Menunggu Pembayaran').length,
    confirmed: orders.filter(o => o.status === 'Dikonfirmasi').length,
    processing: orders.filter(o => o.status === 'Diproses').length,
    shipped: orders.filter(o => o.status === 'Dikirim').length,
    completed: orders.filter(o => o.status === 'Selesai').length,
  };

  const recentOrders = orders.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Enhanced Admin Header */}
      <div 
        className="glass-panel"
        style={{ 
          padding: '24px 28px',
          background: 'linear-gradient(135deg, rgba(159, 18, 57, 0.25) 0%, rgba(20, 16, 13, 0.95) 100%)',
          border: '1.5px solid rgba(159, 18, 57, 0.35)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #9f1239 0%, #be123c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(159, 18, 57, 0.4)'
              }}
            >
              <ShieldCheck size={28} color="#fff" />
            </div>
            <div>
              <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
                Admin Dashboard
              </h1>
              <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: 4 }}>
                Selamat datang, <strong style={{ color: '#fda4af' }}>{currentUser.name}</strong> - Sistem Manajemen Kopi Gayo
              </p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: 12 }}>
            <Link href="/admin/reports" className="btn btn-secondary btn-sm">
              <BarChart3 size={16} />
              <span>Laporan</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI 4 Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
        {/* Card 1: Revenue */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Pendapatan
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
            Rp{totalRevenue.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#86efac', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
            <TrendingUp size={12} /> Dari transaksi terbayar
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Total Pesanan Masuk
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8' }}>
              <ShoppingBag size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fcf9f2' }}>
            {orders.length} Transaksi
          </div>
          <div style={{ fontSize: '0.75rem', color: '#38bdf8', marginTop: 4 }}>
            {statusCounts.completed} pesanan telah selesai
          </div>
        </div>

        {/* Card 3: Products */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(168, 85, 247, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Koleksi Kopi Gayo
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(168, 85, 247, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc' }}>
              <Coffee size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fcf9f2' }}>
            {coffees.length} Varian
          </div>
          <div style={{ fontSize: '0.75rem', color: '#c084fc', marginTop: 4 }}>
            Tersedia di marketplace
          </div>
        </div>

        {/* Card 4: Low Stock */}
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(239, 68, 68, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: '0.8rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase' }}>
              Stok Kritis (&lt;=15)
            </span>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fca5a5' }}>
            {lowStockCoffees.length} Produk
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fca5a5', marginTop: 4 }}>
            Perlu restock segera
          </div>
        </div>
      </div>

      {/* Order Status Distribution Pipeline Cards */}
      <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 16 }}>
          Pipeline Status Pesanan Kopi
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fde047', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              <Clock size={14} /> Belum Bayar
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fde047' }}>
              {statusCounts.pending}
            </div>
          </div>

          <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#7dd3fc', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              <CheckCircle2 size={14} /> Dikonfirmasi
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#7dd3fc' }}>
              {statusCounts.confirmed}
            </div>
          </div>

          <div style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#d8b4fe', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              <Package size={14} /> Diproses
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d8b4fe' }}>
              {statusCounts.processing}
            </div>
          </div>

          <div style={{ background: 'rgba(249, 115, 22, 0.1)', border: '1px solid rgba(249, 115, 22, 0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fdba74', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              <Truck size={14} /> Dikirim
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fdba74' }}>
              {statusCounts.shipped}
            </div>
          </div>

          <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.25)', borderRadius: 12, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#86efac', fontSize: '0.75rem', fontWeight: 700, marginBottom: 4 }}>
              <CheckCircle2 size={14} /> Selesai
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#86efac' }}>
              {statusCounts.completed}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders with Instant Status Modifier */}
      <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fcf9f2', margin: 0 }}>
              Pesanan Terbaru & Kontrol Status Instan
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0 0' }}>
              Ubah status langsung di dropdown ini untuk mensimulasikan pergerakan status pesanan.
            </p>
          </div>
          <Link href="/admin/orders" className="btn btn-secondary btn-sm">
            <span>Lihat Semua Pesanan</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
                <th style={{ padding: '10px 12px' }}>ID Pesanan</th>
                <th style={{ padding: '10px 12px' }}>Pelanggan</th>
                <th style={{ padding: '10px 12px' }}>Total Biaya</th>
                <th style={{ padding: '10px 12px' }}>Pembayaran</th>
                <th style={{ padding: '10px 12px' }}>Ubah Status Pesanan</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#f59e0b' }}>
                    #{order.id}
                  </td>
                  <td style={{ padding: '12px', color: '#fcf9f2' }}>
                    <div>{order.customerName}</div>
                    <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{order.courier}</div>
                  </td>
                  <td style={{ padding: '12px', fontWeight: 700, color: '#fbbf24' }}>
                    Rp{order.totalAmount?.toLocaleString('id-ID')}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 4, background: order.payment.status === 'Paid' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)', color: order.payment.status === 'Paid' ? '#86efac' : '#fde047' }}>
                      {order.payment.method} ({order.payment.status})
                    </span>
                  </td>
                  <td style={{ padding: '12px' }}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        width: 'auto',
                        background: '#181512'
                      }}
                    >
                      <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                      <option value="Dikonfirmasi">Dikonfirmasi</option>
                      <option value="Diproses">Diproses</option>
                      <option value="Dikirim">Dikirim</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
