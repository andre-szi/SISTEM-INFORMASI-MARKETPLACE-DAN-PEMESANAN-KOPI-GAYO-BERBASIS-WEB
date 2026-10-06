'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers, Code, GitFork, BookOpen, CheckCircle } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function OopArchitectureModal() {
  const { isOopModalOpen, setIsOopModalOpen } = useCoffee();
  const [selectedClass, setSelectedClass] = useState('Coffee');

  if (!isOopModalOpen) return null;

  const classes = [
    {
      name: 'User',
      desc: 'Menyimpan identitas customer dan admin dengan role-based authorization.',
      attributes: ['id: String', 'name: String', 'email: String', 'role: "customer"|"admin"', 'phone: String', 'address: String', 'avatar: String'],
      methods: ['login(email, pass): Boolean', 'switchRole(role): void', 'updateProfile(data): void'],
      relations: ['1 User memiliki 1 Cart (1:1)', '1 User memiliki banyak Order (1:N)', '1 User dapat memberikan banyak Review (1:N)']
    },
    {
      name: 'Category',
      desc: 'Klasifikasi produk kopi Gayo berdasarkan varietas dan teknik pemrosesan.',
      attributes: ['id: String', 'name: String', 'description: String', 'icon: String'],
      methods: ['getCoffees(): Coffee[]', 'updateDetails(data): void'],
      relations: ['1 Category mengelompokkan banyak Coffee (1:N)']
    },
    {
      name: 'Coffee',
      desc: 'Entitas inti produk kopi Gayo dengan atribut spesifik perkebunan dan rasa.',
      attributes: ['id: String', 'name: String', 'categoryId: String', 'origin: String', 'process: "Honey"|"Wine"|"Natural"|"Washed"', 'roast: "Light"|"Medium"|"Dark"', 'flavor: String[]', 'weight: Number', 'price: Number', 'stock: Number', 'description: String', 'elevation: String', 'rating: Number', 'image: String'],
      methods: ['reduceStock(qty): Boolean', 'restock(qty): void', 'calculatePriceByWeight(weight): Number', 'updateRating(score): void'],
      relations: ['Berelasi dengan 1 Category (N:1)', 'Dimuat dalam CartItem dan OrderItem']
    },
    {
      name: 'Cart',
      desc: 'Keranjang belanja milik customer yang menampung daftar pilihan kopi.',
      attributes: ['userId: String', 'items: CartItem[]', 'appliedCoupon: Coupon'],
      methods: ['addItem(coffee, grind, weight, qty): void', 'removeItem(cartItemId): void', 'updateQuantity(id, qty): void', 'getTotalPrice(): Number', 'applyCoupon(code): void'],
      relations: ['Dimiliki oleh 1 User (1:1)', 'Memiliki banyak CartItem (1:N Aggregation)']
    },
    {
      name: 'CartItem',
      desc: 'Detail spesifik item kopi dalam keranjang beserta preferensi gilingan dan berat.',
      attributes: ['id: String', 'coffeeId: String', 'coffee: Coffee', 'grindSize: String', 'weight: Number', 'quantity: Number', 'price: Number'],
      methods: ['getSubtotal(): Number', 'setQuantity(qty): void'],
      relations: ['Merujuk ke 1 Coffee (N:1)', 'Merupakan bagian dari Cart']
    },
    {
      name: 'Order',
      desc: 'Entitas transaksi pemesanan kopi lengkap dengan pelacakan status bertahap.',
      attributes: ['id: String', 'userId: String', 'customerName: String', 'shippingAddress: String', 'courier: String', 'shippingCost: Number', 'items: OrderItem[]', 'payment: Payment', 'status: "Menunggu Pembayaran"|"Dikonfirmasi"|"Diproses"|"Dikirim"|"Selesai"', 'trackingNumber: String', 'totalAmount: Number', 'createdAt: Date'],
      methods: ['updateStatus(newStatus): void', 'confirmPayment(): void', 'markAsCompleted(): void'],
      relations: ['Dimiliki oleh 1 User (N:1)', 'Memiliki banyak OrderItem (1:N Composition)', 'Memiliki 1 Payment (1:1 Composition)']
    },
    {
      name: 'OrderItem',
      desc: 'Snapshot item produk yang telah dipesan saat checkout terkunci.',
      attributes: ['coffeeId: String', 'name: String', 'grindSize: String', 'weight: Number', 'quantity: Number', 'price: Number', 'image: String'],
      methods: ['getItemTotal(): Number'],
      relations: ['Merujuk ke data historis Coffee', 'Bagian mutlak dari Order']
    },
    {
      name: 'Payment',
      desc: 'Informasi dan status pembayaran pesanan (QRIS / Bank VA / E-Wallet).',
      attributes: ['method: String', 'status: "Pending"|"Paid"|"Failed"', 'transactionId: String', 'amount: Number', 'paidAt: Date'],
      methods: ['processPayment(): Boolean', 'verifyStatus(): String'],
      relations: ['Menempel pada 1 Order (1:1)']
    },
    {
      name: 'Review',
      desc: 'Ulasan dan penilaian bintang dari pembeli terhadap produk kopi Gayo.',
      attributes: ['id: String', 'coffeeId: String', 'userId: String', 'userName: String', 'rating: Number (1-5)', 'comment: String', 'createdAt: Date'],
      methods: ['validateScore(): Boolean'],
      relations: ['Dibuat oleh 1 User (N:1)', 'Ditujukan untuk 1 Coffee (N:1)']
    }
  ];

  const currentClassData = classes.find(c => c.name === selectedClass);

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={() => setIsOopModalOpen(false)} style={{ zIndex: 1200 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel-heavy"
          style={{
            maxWidth: 960,
            width: '100%',
            maxHeight: '92vh',
            overflowY: 'auto',
            borderRadius: 24,
            padding: '30px',
            color: '#fcf9f2'
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: 'rgba(56, 189, 248, 0.15)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Layers size={24} color="#38bdf8" />
              </div>
              <div>
                <h2 className="font-serif" style={{ fontSize: '1.4rem', color: '#fcf9f2', margin: 0 }}>
                  Dokumentasi Arsitektur Berbasis Objek (POPL)
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#9ca3af', margin: 0 }}>
                  Konsep Objek, Atribut, Method, dan Relasi Class (UTS Pengembangan Objek Perangkat Lunak)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOopModalOpen(false)}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#d1c7bc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
            {/* Sidebar List of Classes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: 6 }}>
                9 Objek / Class Utama:
              </div>
              {classes.map(c => (
                <button
                  key={c.name}
                  onClick={() => setSelectedClass(c.name)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 14px',
                    borderRadius: 10,
                    background: selectedClass === c.name ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                    border: selectedClass === c.name ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.06)',
                    color: selectedClass === c.name ? '#7dd3fc' : '#d1c7bc',
                    fontWeight: selectedClass === c.name ? 700 : 500,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>class {c.name}</span>
                  {selectedClass === c.name && <CheckCircle size={14} color="#38bdf8" />}
                </button>
              ))}
            </div>

            {/* Class Details Card */}
            {currentClassData && (
              <div
                style={{
                  background: 'rgba(22, 18, 15, 0.8)',
                  border: '1px solid rgba(217, 119, 6, 0.25)',
                  borderRadius: 16,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 18
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f59e0b', fontFamily: 'monospace' }}>
                      class {currentClassData.name}
                    </span>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: 4, fontWeight: 700 }}>
                      POPL MODEL
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#d1c7bc', margin: 0 }}>
                    {currentClassData.desc}
                  </p>
                </div>

                {/* Attributes */}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Code size={14} /> Atribut / Properti:
                  </div>
                  <div style={{ background: 'rgba(10, 9, 7, 0.7)', borderRadius: 10, padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.08)', fontFamily: 'monospace', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {currentClassData.attributes.map((attr, idx) => (
                      <div key={idx} style={{ color: '#86efac' }}>
                        + {attr}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Methods */}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <BookOpen size={14} /> Method / Operasi:
                  </div>
                  <div style={{ background: 'rgba(10, 9, 7, 0.7)', borderRadius: 10, padding: '12px 16px', border: '1px solid rgba(255, 255, 255, 0.08)', fontFamily: 'monospace', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {currentClassData.methods.map((method, idx) => (
                      <div key={idx} style={{ color: '#7dd3fc' }}>
                        + {method}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Relations */}
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f472b6', textTransform: 'uppercase', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <GitFork size={14} /> Relasi Antar Objek:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {currentClassData.relations.map((rel, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '0.85rem',
                          color: '#e5e7eb',
                          background: 'rgba(255, 255, 255, 0.04)',
                          padding: '6px 12px',
                          borderRadius: 8,
                          borderLeft: '3px solid #f472b6'
                        }}
                      >
                        {rel}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
