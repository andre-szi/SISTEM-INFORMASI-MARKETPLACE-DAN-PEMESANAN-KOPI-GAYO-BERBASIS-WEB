'use client';

import React from 'react';
import { Users, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import { INITIAL_USERS } from '@/data/initialData';

export default function AdminCustomersPage() {
  const { orders } = useCoffee();

  const customers = [
    {
      id: 'cust-1',
      name: 'Budi Santoso',
      email: 'budi@mahasiswa.id',
      phone: '0813-1234-5678',
      address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160',
      registeredAt: '2026-09-15'
    },
    {
      id: 'cust-2',
      name: 'Anita Rahmawati',
      email: 'anita.rahma@gmail.com',
      phone: '0857-9911-2233',
      address: 'Jl. Dago Asri No. 4, Coblong, Bandung, Jawa Barat 40135',
      registeredAt: '2026-09-22'
    },
    {
      id: 'cust-3',
      name: 'Rian Pratama',
      email: 'rian.pratama@outlook.com',
      phone: '0812-7788-9900',
      address: 'Jl. Kaliurang KM 5, Depok, Sleman, DI Yogyakarta 55281',
      registeredAt: '2026-10-01'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
          Data Pelanggan (Customer)
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4 }}>
          Daftar pengguna terdaftar yang melakukan pemesanan kopi Gayo.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: 20, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
              <th style={{ padding: '12px' }}>Nama Pelanggan</th>
              <th style={{ padding: '12px' }}>Kontak</th>
              <th style={{ padding: '12px' }}>Alamat Pengiriman Utama</th>
              <th style={{ padding: '12px' }}>Status Akun</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(cust => (
              <tr key={cust.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fcf9f2' }}>{cust.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>Terdaftar: {cust.registeredAt}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '12px', color: '#d1c7bc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                    <Mail size={12} color="#f59e0b" /> {cust.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', marginTop: 2 }}>
                    <Phone size={12} color="#f59e0b" /> {cust.phone}
                  </div>
                </td>

                <td style={{ padding: '12px', color: '#d1c7bc', maxWidth: 280 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                    <MapPin size={14} color="#f59e0b" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.8rem', lineHeight: 1.4 }}>{cust.address}</span>
                  </div>
                </td>

                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(34, 197, 94, 0.15)', color: '#86efac', fontWeight: 600 }}>
                    Customer Aktif
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
