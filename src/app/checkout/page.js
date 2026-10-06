'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Building2,
  Smartphone,
  ArrowRight,
  Clock,
  Coffee
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';
import GuestPrompt from '@/components/GuestPrompt';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    cart,
    cartTotal,
    currentUser,
    createOrder,
    appliedCoupon
  } = useCoffee();

  // Protect checkout - only logged in customers
  if (!currentUser || currentUser.role === 'admin') {
    return (
      <GuestPrompt 
        title="Login Customer Diperlukan"
        message="Anda harus login sebagai customer untuk melakukan checkout pembelian kopi"
        showAdminOption={false}
      />
    );
  }

  // Form Fields
  const [recipientName, setRecipientName] = useState(currentUser?.name || 'Budi Santoso');
  const [recipientPhone, setRecipientPhone] = useState(currentUser?.phone || '0813-1234-5678');
  const [shippingAddress, setShippingAddress] = useState(currentUser?.address || 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160');
  const [cityNote, setCityNote] = useState('Aceh Tengah / Pengiriman Domestik Seluruh Indonesia');
  const [notes, setNotes] = useState('');

  // Shipping Courier Selection
  const [selectedCourier, setSelectedCourier] = useState('JNE Reguler');
  const courierOptions = [
    { id: 'JNE Reguler', name: 'JNE Reguler (2-3 Hari)', cost: 18000 },
    { id: 'SiCepat BEST', name: 'SiCepat BEST (1-2 Hari)', cost: 24000 },
    { id: 'J&T Express', name: 'J&T Express (2-4 Hari)', cost: 16000 }
  ];

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const paymentMethods = [
    {
      id: 'QRIS',
      name: 'QRIS (Semua E-Wallet & Mobile Banking)',
      desc: 'Scan instan via BCA, Mandiri, GoPay, OVO, ShopeePay',
      icon: QrCode
    },
    {
      id: 'BCA Virtual Account',
      name: 'BCA Virtual Account',
      desc: 'Nomor VA otomatis terverifikasi tanpa upload bukti',
      icon: Building2
    },
    {
      id: 'Mandiri VA',
      name: 'Mandiri Virtual Account',
      desc: 'Pembayaran melalui Livin by Mandiri atau ATM',
      icon: Building2
    },
    {
      id: 'GoPay / OVO',
      name: 'GoPay & E-Wallet Instan',
      desc: 'Konfirmasi langsung dari aplikasi dompet digital',
      icon: Smartphone
    }
  ];

  // Processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const selectedCourierObj = courierOptions.find(c => c.id === selectedCourier) || courierOptions[0];
  const shippingCost = cart.length > 0 ? selectedCourierObj.cost : 0;
  const grandTotal = cartTotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      router.push('/marketplace');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const fullAddress = `${recipientName} (${recipientPhone}) - ${shippingAddress}. Catatan: ${notes || 'Tidak ada'}`;
      const newOrder = createOrder({
        shippingAddress: fullAddress,
        courier: selectedCourier,
        shippingCost,
        paymentMethod
      });

      setIsSubmitting(false);
      setCompletedOrder(newOrder);
    }, 1000);
  };

  return (
    <div className="container" style={{ paddingTop: 30, paddingBottom: 60 }}>
      {/* Title */}
      <div style={{ marginBottom: 28 }}>
        <h1 className="font-serif" style={{ fontSize: '2.2rem', color: '#fcf9f2', margin: 0 }}>
          Checkout & Pemesanan Kopi
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginTop: 4 }}>
          Lengkapi data alamat pengiriman dan pilih metode pembayaran simulasi.
        </p>
      </div>

      {cart.length === 0 && !completedOrder ? (
        <div className="glass-panel" style={{ padding: '60px 20px', textAlign: 'center', maxWidth: 450, margin: '40px auto' }}>
          <Coffee size={40} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ color: '#fcf9f2', marginBottom: 8 }}>Keranjang Kosong</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: 20 }}>
            Silakan masukkan biji kopi ke keranjang terlebih dahulu sebelum melakukan checkout.
          </p>
          <button onClick={() => router.push('/marketplace')} className="btn btn-primary btn-sm">
            Kembali ke Marketplace
          </button>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32 }} className="checkout-layout">
          {/* Left Form: Address & Payment */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Step 1: Address */}
            <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f59e0b', color: '#120e09', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2' }}>
                  Alamat Pengiriman
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Nama Penerima:
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Nomor WhatsApp / Telepon:
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Alamat Lengkap (Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota, Kode Pos):
                </label>
                <textarea
                  rows={3}
                  required
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Catatan untuk Penjual / Roaster (Opsional):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jangan lupa packing kardus tebal & bubble wrap"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Step 2: Shipping Method */}
            <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f59e0b', color: '#120e09', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2' }}>
                  Pilihan Jasa Ekspedisi / Kurir
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {courierOptions.map(courier => (
                  <label
                    key={courier.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      borderRadius: 12,
                      background: selectedCourier === courier.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: selectedCourier === courier.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <input
                        type="radio"
                        name="courier"
                        checked={selectedCourier === courier.id}
                        onChange={() => setSelectedCourier(courier.id)}
                        style={{ width: 'auto', accentColor: '#f59e0b' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fcf9f2' }}>
                          {courier.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                          Dikirim langsung dari Roastery Takengon, Aceh
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#fbbf24' }}>
                      Rp{courier.cost.toLocaleString('id-ID')}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="glass-panel" style={{ padding: 24, border: '1px solid rgba(217, 119, 6, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, paddingBottom: 12, borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f59e0b', color: '#120e09', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem' }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2' }}>
                  Metode Pembayaran
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {paymentMethods.map(method => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 16px',
                        borderRadius: 12,
                        background: paymentMethod === method.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                        border: paymentMethod === method.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          style={{ width: 'auto', accentColor: '#f59e0b' }}
                        />
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                          <Icon size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fcf9f2' }}>
                            {method.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                            {method.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary Area */}
          <div>
            <div
              className="glass-panel"
              style={{
                padding: 24,
                position: 'sticky',
                top: 96,
                border: '1px solid rgba(217, 119, 6, 0.25)'
              }}
            >
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fcf9f2', marginBottom: 16, borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: 12 }}>
                Item yang Dipesan ({cart.length})
              </h3>

              {/* Items List Mini */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 220, overflowY: 'auto', marginBottom: 18, paddingRight: 4 }}>
                {cart.map(item => (
                  <div key={item.id} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: '0.85rem' }}>
                    <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                      <Image
                        src={item.coffee?.image || 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=100&q=80'}
                        alt={item.coffee?.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, color: '#fcf9f2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.coffee?.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                        {item.grindSize} • {item.weight}g x {item.quantity}
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: '0.85rem' }}>
                      Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Calculation */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.88rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: 14, marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <span>Subtotal Kopi</span>
                  <span>Rp{cartTotal.toLocaleString('id-ID')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9ca3af' }}>
                  <span>Ongkos Kirim ({selectedCourier.split(' ')[0]})</span>
                  <span>Rp{shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#fcf9f2',
                    paddingTop: 10,
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <span>Total Tagihan</span>
                  <span style={{ color: '#f59e0b' }}>Rp{grandTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary"
                style={{ width: '100%', padding: '14px', fontSize: '1rem' }}
              >
                {isSubmitting ? (
                  <span>Memproses Pesanan...</span>
                ) : (
                  <>
                    <span>Buat Pesanan Sekarang</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div style={{ marginTop: 14, textAlign: 'center', fontSize: '0.78rem', color: '#9ca3af' }}>
                Pesanan Anda akan langsung diproses dan disiapkan oleh roastery kami.
              </div>
            </div>
          </div>
        </form>
      )}

      {/* SUCCESS MODAL AFTER PLACING ORDER */}
      {completedOrder && (
        <div className="modal-backdrop" style={{ zIndex: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-heavy"
            style={{
              maxWidth: 520,
              width: '100%',
              borderRadius: 24,
              padding: 32,
              textAlign: 'center',
              border: '1px solid rgba(245, 158, 11, 0.4)'
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <CheckCircle2 size={36} />
            </div>

            <h2 className="font-serif" style={{ fontSize: '1.6rem', color: '#fcf9f2', marginBottom: 8 }}>
              Pesanan Berhasil Dibuat!
            </h2>
            <p style={{ color: '#fbbf24', fontSize: '0.95rem', fontWeight: 700, marginBottom: 4 }}>
              ID Pesanan: #{completedOrder.id}
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginBottom: 20 }}>
              Status Saat Ini: <span className="status-badge status-badge-pending">Menunggu Pembayaran</span>
            </p>

            {/* Simulated Payment Box */}
            <div
              style={{
                background: 'rgba(28, 23, 19, 0.8)',
                borderRadius: 14,
                padding: 18,
                border: '1px solid rgba(217, 119, 6, 0.25)',
                marginBottom: 24,
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af' }}>Metode Pembayaran:</span>
                <span style={{ fontWeight: 700, color: '#fcf9f2' }}>{completedOrder.payment.method}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: '0.85rem' }}>
                <span style={{ color: '#9ca3af' }}>Total yang Harus Dibayar:</span>
                <span style={{ fontWeight: 800, color: '#f59e0b', fontSize: '1.05rem' }}>
                  Rp{completedOrder.totalAmount.toLocaleString('id-ID')}
                </span>
              </div>

              {completedOrder.payment.method === 'QRIS' ? (
                <div style={{ textAlign: 'center', padding: '10px 0', borderTop: '1px dashed rgba(255, 255, 255, 0.1)', marginTop: 10 }}>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: 8 }}>
                    Kode QRIS Pembayaran Resmi:
                  </div>
                  <div style={{ width: 140, height: 140, background: '#ffffff', borderRadius: 10, padding: 8, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <QrCode size={110} color="#120e09" />
                  </div>
                </div>
              ) : (
                <div style={{ padding: '8px 0', borderTop: '1px dashed rgba(255, 255, 255, 0.1)', marginTop: 8 }}>
                  <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Nomor Virtual Account:</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#86efac', letterSpacing: 1, marginTop: 4 }}>
                    8809 1234 9820 1192
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => router.push('/orders')}
                className="btn btn-primary"
                style={{ flex: 1 }}
              >
                <span>Pantau Pesanan di Riwayat</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 880px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
