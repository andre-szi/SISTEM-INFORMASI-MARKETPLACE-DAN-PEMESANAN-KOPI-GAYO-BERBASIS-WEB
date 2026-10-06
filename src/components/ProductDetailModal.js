'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Star,
  MapPin,
  Flame,
  Award,
  Sparkles,
  ShoppingBag,
  Plus,
  Minus,
  Check,
  Coffee,
  MessageSquare
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function ProductDetailModal() {
  const {
    activeProductModal,
    setActiveProductModal,
    addToCart,
    reviews,
    addReview
  } = useCoffee();

  const [selectedGrind, setSelectedGrind] = useState('Biji Utuh');
  const [selectedWeight, setSelectedWeight] = useState(200);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details'); // 'details' | 'reviews'

  // Review Form state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  if (!activeProductModal) return null;

  const coffee = activeProductModal;

  // Calculate dynamic price based on weight
  let priceMultiplier = 1;
  if (selectedWeight === 500) priceMultiplier = 2.35;
  if (selectedWeight === 1000) priceMultiplier = 4.4;
  const unitPrice = Math.round(coffee.price * priceMultiplier);
  const totalPrice = unitPrice * quantity;

  const grindOptions = [
    { id: 'Biji Utuh', label: 'Biji Utuh (Whole Bean)', desc: 'Cocok digiling segar di rumah' },
    { id: 'Giling Kasar', label: 'Giling Kasar (Coarse)', desc: 'Cold Brew, French Press' },
    { id: 'Giling Sedang', label: 'Giling Sedang (Medium)', desc: 'V60, Aeropress, Kalita Wave' },
    { id: 'Giling Halus', label: 'Giling Halus (Fine)', desc: 'Espresso, Tubruk, Moka Pot' }
  ];

  const weightOptions = [
    { weight: 200, label: '200 gram' },
    { weight: 500, label: '500 gram (Hemat 5%)' },
    { weight: 1000, label: '1 kg (Hemat 12%)' }
  ];

  const handleAddToCart = () => {
    addToCart(coffee, selectedGrind, selectedWeight, quantity);
    setActiveProductModal(null);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addReview({
      coffeeId: coffee.id,
      rating: newRating,
      comment: newComment.trim()
    });
    setNewComment('');
  };

  const coffeeReviews = reviews.filter(r => r.coffeeId === coffee.id);

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={() => setActiveProductModal(null)}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="glass-panel-heavy"
          style={{
            maxWidth: 880,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 24,
            padding: 0,
            position: 'relative',
            color: '#fcf9f2'
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setActiveProductModal(null)}
            style={{
              position: 'absolute',
              top: 18,
              right: 18,
              zIndex: 10,
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'rgba(28, 23, 19, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#fcf9f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>

          {/* Grid Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* Left Column: Image and Origin info */}
            <div style={{ position: 'relative', minHeight: 340, background: '#120e0a' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 340 }}>
                <Image
                  src={coffee.image}
                  alt={coffee.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, #14110d 0%, transparent 70%)'
                  }}
                />
              </div>

              {/* Badges on image */}
              <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge badge-origin">
                    <MapPin size={12} /> {coffee.origin}
                  </span>
                  <span className="badge" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
                    <Sparkles size={12} /> {coffee.process} Process
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '0.85rem', color: '#d1c7bc' }}>
                  <span>Elevasi: <strong>{coffee.elevation}</strong></span>
                  <span>Acidity: <strong>{coffee.acidity}</strong></span>
                </div>
              </div>
            </div>

            {/* Right Column: Details & Order Customization */}
            <div style={{ padding: '32px 28px', display: 'flex', flexDirection: 'column' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', gap: 16, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: 20, paddingBottom: 10 }}>
                <button
                  onClick={() => setActiveTab('details')}
                  style={{
                    color: activeTab === 'details' ? '#f59e0b' : '#9ca3af',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingBottom: 6,
                    borderBottom: activeTab === 'details' ? '2px solid #f59e0b' : '2px solid transparent'
                  }}
                >
                  <Coffee size={16} /> Spesifikasi & Pemesanan
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  style={{
                    color: activeTab === 'reviews' ? '#f59e0b' : '#9ca3af',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    paddingBottom: 6,
                    borderBottom: activeTab === 'reviews' ? '2px solid #f59e0b' : '2px solid transparent'
                  }}
                >
                  <MessageSquare size={16} /> Ulasan ({coffeeReviews.length})
                </button>
              </div>

              {activeTab === 'details' ? (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontWeight: 700 }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                      <span>{coffee.rating}</span>
                    </div>
                    <span style={{ color: '#78716c' }}>•</span>
                    <span style={{ fontSize: '0.82rem', color: '#9ca3af' }}>{coffee.reviewCount} ulasan pembeli</span>
                    <span style={{ color: '#78716c' }}>•</span>
                    <span style={{ fontSize: '0.82rem', color: coffee.stock <= 5 ? '#fca5a5' : '#86efac' }}>
                      Stok: {coffee.stock} pcs
                    </span>
                  </div>

                  <h2 className="font-serif" style={{ fontSize: '1.5rem', marginBottom: 12, color: '#fcf9f2' }}>
                    {coffee.name}
                  </h2>

                  <p style={{ fontSize: '0.88rem', color: '#d1c7bc', lineHeight: 1.6, marginBottom: 16 }}>
                    {coffee.description}
                  </p>

                  {/* Flavor Profile Pills */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>
                      Flavor Profile / Karakter Rasa:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {coffee.flavor?.map((f, i) => (
                        <span key={i} className="flavor-pill" style={{ padding: '4px 10px', fontSize: '0.82rem' }}>
                          ☕ {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Weight Selector */}
                  <div style={{ marginBottom: 18 }}>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                      Pilih Ukuran Kemasan:
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {weightOptions.map(opt => (
                        <button
                          key={opt.weight}
                          onClick={() => setSelectedWeight(opt.weight)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 10,
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            background: selectedWeight === opt.weight ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                            border: selectedWeight === opt.weight ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.1)',
                            color: selectedWeight === opt.weight ? '#f59e0b' : '#d1c7bc',
                            cursor: 'pointer'
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grind Size Selector */}
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: '0.78rem', color: '#9ca3af', textTransform: 'uppercase', marginBottom: 8, fontWeight: 600 }}>
                      Pilih Tingkat Gilingan (Grind Size):
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                      {grindOptions.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedGrind(opt.id)}
                          style={{
                            textAlign: 'left',
                            padding: '10px 12px',
                            borderRadius: 10,
                            background: selectedGrind === opt.id ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                            border: selectedGrind === opt.id ? '1px solid #f59e0b' : '1px solid rgba(255, 255, 255, 0.08)',
                            color: selectedGrind === opt.id ? '#fbbf24' : '#d1c7bc',
                            cursor: 'pointer'
                          }}
                        >
                          <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{opt.id}</div>
                          <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: 2 }}>{opt.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price & Quantity & Submit */}
                  <div
                    style={{
                      marginTop: 'auto',
                      paddingTop: 16,
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: 16
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Total Harga:</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f59e0b' }}>
                        Rp{totalPrice.toLocaleString('id-ID')}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 10, padding: '4px 8px' }}>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        style={{ color: '#d1c7bc', padding: 4 }}
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(coffee.stock, quantity + 1))}
                        style={{ color: '#d1c7bc', padding: 4 }}
                        disabled={quantity >= coffee.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      className="btn btn-primary"
                      disabled={coffee.stock <= 0}
                      style={{ flex: 1, minWidth: 160 }}
                    >
                      <ShoppingBag size={18} />
                      <span>{coffee.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}</span>
                    </button>
                  </div>
                </>
              ) : (
                /* Reviews Tab */
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ flex: 1, maxHeight: 320, overflowY: 'auto', paddingRight: 8, marginBottom: 16 }}>
                    {coffeeReviews.length === 0 ? (
                      <p style={{ color: '#9ca3af', textAlign: 'center', margin: '40px 0' }}>
                        Belum ada ulasan untuk produk kopi ini. Jadilah yang pertama memberikan ulasan!
                      </p>
                    ) : (
                      coffeeReviews.map(rev => (
                        <div
                          key={rev.id}
                          style={{
                            padding: '12px 14px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderRadius: 12,
                            border: '1px solid rgba(255, 255, 255, 0.06)',
                            marginBottom: 10
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                            <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fcf9f2' }}>
                              {rev.userName}
                            </span>
                            <div style={{ display: 'flex', gap: 2 }}>
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={13}
                                  fill={i < rev.rating ? '#f59e0b' : 'none'}
                                  color={i < rev.rating ? '#f59e0b' : '#6b7280'}
                                />
                              ))}
                            </div>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: '#d1c7bc', margin: 0, lineHeight: 1.5 }}>
                            {rev.comment}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Review Form */}
                  <form onSubmit={handleReviewSubmit} style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: '0.85rem', color: '#d1c7bc' }}>Beri Rating:</span>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewRating(star)}
                            style={{ cursor: 'pointer', padding: 2 }}
                          >
                            <Star
                              size={18}
                              fill={star <= newRating ? '#f59e0b' : 'none'}
                              color={star <= newRating ? '#f59e0b' : '#6b7280'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input
                        type="text"
                        placeholder="Tulis ulasan rasa, aroma, atau pengalaman seduh Anda..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        style={{ flex: 1 }}
                      />
                      <button type="submit" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Kirim
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
