'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Filter,
  CheckCircle,
  Truck,
  Package,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useCoffee();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredOrders = orders.filter(ord => {
    const matchesSearch =
      ord.id.toLowerCase().includes(search.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(search.toLowerCase()) ||
      ord.trackingNumber.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
          Manajemen & Status Pesanan Customer
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4 }}>
          Kelola pesanan masuk dan perbarui tahapan pemrosesan kopi Gayo secara real-time.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ position: 'relative', width: 320 }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari ID pesanan, nomor resi, atau nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 38, fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ width: 'auto', minWidth: 180, fontSize: '0.85rem' }}
          >
            <option value="all">Semua Status</option>
            <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
            <option value="Dikonfirmasi">Dikonfirmasi</option>
            <option value="Diproses">Diproses</option>
            <option value="Dikirim">Dikirim</option>
            <option value="Selesai">Selesai</option>
          </select>
        </div>
      </div>

      {/* Orders List Table */}
      <div className="glass-panel" style={{ padding: 20, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
              <th style={{ padding: '12px' }}>ID & Tanggal</th>
              <th style={{ padding: '12px' }}>Pelanggan & Alamat</th>
              <th style={{ padding: '12px' }}>Produk Kopi Dipesan</th>
              <th style={{ padding: '12px' }}>Total Biaya</th>
              <th style={{ padding: '12px' }}>Status & Aksi Admin</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)', verticalAlign: 'top' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '0.95rem' }}>
                    #{order.id}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 4 }}>
                    {new Date(order.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginTop: 4 }}>
                    Resi: {order.trackingNumber}
                  </div>
                </td>

                <td style={{ padding: '12px', maxWidth: 220 }}>
                  <div style={{ fontWeight: 700, color: '#fcf9f2' }}>
                    {order.customerName}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#d1c7bc', marginTop: 4, lineHeight: 1.4 }}>
                    {order.shippingAddress}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#86efac', marginTop: 4 }}>
                    Kurir: {order.courier}
                  </div>
                </td>

                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {order.items?.map((item, idx) => (
                      <div key={idx} style={{ fontSize: '0.8rem', color: '#d1c7bc' }}>
                        • <strong>{item.name}</strong> ({item.grindSize}, {item.weight}g) x {item.quantity}
                      </div>
                    ))}
                  </div>
                </td>

                <td style={{ padding: '12px' }}>
                  <div style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1rem' }}>
                    Rp{order.totalAmount?.toLocaleString('id-ID')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 2 }}>
                    {order.payment?.method} ({order.payment?.status})
                  </div>
                </td>

                <td style={{ padding: '12px' }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      background: '#181512',
                      border: '1px solid rgba(245, 158, 11, 0.4)'
                    }}
                  >
                    <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                    <option value="Dikonfirmasi">Dikonfirmasi</option>
                    <option value="Diproses">Diproses (Roasting & Grinding)</option>
                    <option value="Dikirim">Dikirim ke Kurir</option>
                    <option value="Selesai">Selesai Diterima</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
