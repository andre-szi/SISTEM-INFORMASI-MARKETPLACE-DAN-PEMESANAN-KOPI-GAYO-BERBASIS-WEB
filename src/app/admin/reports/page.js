'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Package,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminReportsPage() {
  const { orders, coffees, showToast } = useCoffee();

  const [dateRange, setDateRange] = useState('monthly');

  // Calculations
  const completedOrders = orders.filter(o => o.status === 'Selesai' || o.payment.status === 'Paid');
  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalAmount, 0);
  const avgOrderValue = completedOrders.length > 0 ? Math.round(totalRevenue / completedOrders.length) : 0;

  // Monthly Sales Simulation Data for Bar Chart
  const monthlyData = [
    { month: 'Mei', amount: 1450000, height: '40%' },
    { month: 'Jun', amount: 2100000, height: '55%' },
    { month: 'Jul', amount: 1850000, height: '48%' },
    { month: 'Agu', amount: 2950000, height: '75%' },
    { month: 'Sep', amount: 3400000, height: '88%' },
    { month: 'Okt (Berjalan)', amount: totalRevenue, height: '95%' }
  ];

  const handleExportCSV = () => {
    // Generate CSV content
    const headers = 'ID Pesanan,Tanggal,Pelanggan,Total Biaya,Status,Metode Pembayaran\n';
    const rows = orders.map(o =>
      `"${o.id}","${o.createdAt}","${o.customerName}",${o.totalAmount},"${o.status}","${o.payment.method}"`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Penjualan_Kopi_Gayo_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Laporan penjualan (CSV) berhasil diunduh!', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header with Export Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
            Laporan Penjualan & Analitik Kopi Gayo
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4 }}>
            Statistik pendapatan, tren transaksi, dan rekapitulasi data penjualan.
          </p>
        </div>

        <button onClick={handleExportCSV} className="btn btn-primary" style={{ padding: '10px 18px', gap: 8 }}>
          <Download size={18} />
          <span>Export Laporan (.CSV)</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Omset Bersih Terbayar
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f59e0b' }}>
            Rp{totalRevenue.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#86efac', marginTop: 4 }}>
            Dari {completedOrders.length} transaksi sukses
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Rata-rata Nilai Pesanan (AOV)
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#38bdf8' }}>
            Rp{avgOrderValue.toLocaleString('id-ID')}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>
            Per keranjang pesanan
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 20, border: '1px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>
            Kopi Paling Laris
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#86efac' }}>
            Gayo Arabica Honey
          </div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: 4 }}>
            38 ulasan pembeli (4.9 ★)
          </div>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#fcf9f2', margin: 0 }}>
              Grafik Pertumbuhan Pendapatan Bulanan
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '2px 0 0 0' }}>
              Visualisasi tren akumulasi penjualan dalam 6 bulan terakhir.
            </p>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '4px 10px', borderRadius: 8 }}>
            Tren Positif +24%
          </div>
        </div>

        {/* Custom CSS Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 220, gap: 14, paddingTop: 20, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 10 }}>
          {monthlyData.map((item, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: 8 }}>
              <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 700 }}>
                Rp{(item.amount / 1000000).toFixed(1)}M
              </span>
              <div
                style={{
                  width: '80%',
                  maxWidth: 48,
                  height: item.height,
                  background: 'linear-gradient(to top, #d97706, #fbbf24)',
                  borderRadius: '8px 8px 0 0',
                  boxShadow: '0 0 15px rgba(245, 158, 11, 0.25)',
                  transition: 'height 0.5s ease'
                }}
              />
              <span style={{ fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
