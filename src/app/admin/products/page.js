'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Coffee,
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  AlertTriangle,
  Flame,
  MapPin
} from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminProductsPage() {
  const {
    coffees,
    categories,
    addCoffee,
    updateCoffee,
    deleteCoffee,
    updateStock
  } = useCoffee();

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCoffee, setEditingCoffee] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    categoryId: categories[0]?.id || 'cat-1',
    origin: 'Aceh Tengah (Takengon)',
    process: 'Honey',
    roast: 'Medium',
    flavor: 'Caramel, Chocolate, Sweet',
    weight: 200,
    price: 85000,
    stock: 25,
    description: '',
    elevation: '1500 - 1650 mdpl',
    acidity: 'Medium Clean',
    body: 'Smooth & Full',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    isFeatured: false
  };

  const [formData, setFormData] = useState(initialForm);

  const filteredCoffees = coffees.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.origin.toLowerCase().includes(search.toLowerCase()) ||
    c.process.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingCoffee(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (coffee) => {
    setEditingCoffee(coffee);
    setFormData({
      ...coffee,
      flavor: Array.isArray(coffee.flavor) ? coffee.flavor.join(', ') : coffee.flavor
    });
    setModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingCoffee) {
      updateCoffee(editingCoffee.id, formData);
    } else {
      addCoffee(formData);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    deleteCoffee(id);
    setDeleteConfirmId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
            Manajemen Produk Kopi Gayo (CRUD)
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4 }}>
            Kelola katalog biji kopi, profil roasting, harga, dan kontrol stok barang.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '10px 18px', gap: 8 }}>
          <Plus size={18} />
          <span>Tambah Kopi Baru</span>
        </button>
      </div>

      {/* Search & Counter */}
      <div className="glass-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ position: 'relative', width: 320 }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Cari nama kopi, origin, atau proses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: 38, fontSize: '0.85rem' }}
          />
        </div>
        <div style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
          Total Terdaftar: <strong style={{ color: '#f59e0b' }}>{filteredCoffees.length}</strong> varian
        </div>
      </div>

      {/* Products Table */}
      <div className="glass-panel" style={{ padding: 20, overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#9ca3af' }}>
              <th style={{ padding: '12px' }}>Produk Kopi</th>
              <th style={{ padding: '12px' }}>Origin & Proses</th>
              <th style={{ padding: '12px' }}>Roast</th>
              <th style={{ padding: '12px' }}>Harga (/200g)</th>
              <th style={{ padding: '12px' }}>Stok</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoffees.map(coffee => (
              <tr key={coffee.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                {/* Product Name & Thumbnail */}
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ position: 'relative', width: 44, height: 44, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                      <Image
                        src={coffee.image}
                        alt={coffee.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#fcf9f2' }}>{coffee.name}</div>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                        ID: {coffee.id} • Rating: {coffee.rating} ({coffee.reviewCount})
                      </div>
                    </div>
                  </div>
                </td>

                {/* Origin & Process */}
                <td style={{ padding: '12px', color: '#d1c7bc' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#f59e0b', fontSize: '0.78rem' }}>
                    <MapPin size={12} /> {coffee.origin}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fbbf24', marginTop: 2 }}>
                    Proses: {coffee.process}
                  </div>
                </td>

                {/* Roast */}
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '0.75rem', padding: '3px 8px', borderRadius: 4, background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
                    {coffee.roast}
                  </span>
                </td>

                {/* Price */}
                <td style={{ padding: '12px', fontWeight: 800, color: '#f59e0b' }}>
                  Rp{coffee.price?.toLocaleString('id-ID')}
                </td>

                {/* Stock Controls */}
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input
                      type="number"
                      min="0"
                      value={coffee.stock}
                      onChange={(e) => updateStock(coffee.id, e.target.value)}
                      style={{ width: 64, padding: '4px 6px', fontSize: '0.82rem', textAlign: 'center' }}
                    />
                    <span style={{ fontSize: '0.72rem', color: coffee.stock <= 10 ? '#fca5a5' : '#86efac' }}>
                      {coffee.stock <= 10 ? 'Kritis' : 'Aman'}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <button
                      onClick={() => handleOpenEdit(coffee)}
                      style={{ padding: 6, borderRadius: 6, background: 'rgba(255, 255, 255, 0.06)', color: '#38bdf8', cursor: 'pointer' }}
                      title="Ubah data produk"
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(coffee.id)}
                      style={{ padding: 6, borderRadius: 6, background: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', cursor: 'pointer' }}
                      title="Hapus produk"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL TAMBAH / EDIT PRODUK */}
      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)} style={{ zIndex: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-heavy"
            style={{ maxWidth: 680, width: '100%', maxHeight: '90vh', overflowY: 'auto', borderRadius: 24, padding: 30, color: '#fcf9f2' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <h2 className="font-serif" style={{ fontSize: '1.4rem', margin: 0 }}>
                {editingCoffee ? 'Edit Data Produk Kopi' : 'Tambah Produk Kopi Gayo Baru'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#9ca3af', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Row 1: Name & Category */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Nama Produk Kopi:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Kategori:
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Origin, Process, Roast */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Origin:
                  </label>
                  <select
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  >
                    <option value="Aceh Tengah (Takengon)">Aceh Tengah (Takengon)</option>
                    <option value="Bener Meriah">Bener Meriah</option>
                    <option value="Gayo Lues">Gayo Lues</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Proses:
                  </label>
                  <select
                    value={formData.process}
                    onChange={(e) => setFormData({ ...formData, process: e.target.value })}
                  >
                    <option value="Honey">Honey Process</option>
                    <option value="Wine">Wine Process</option>
                    <option value="Natural">Natural Sun-Dried</option>
                    <option value="Washed">Full Washed</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Roasting:
                  </label>
                  <select
                    value={formData.roast}
                    onChange={(e) => setFormData({ ...formData, roast: e.target.value })}
                  >
                    <option value="Light">Light Roast</option>
                    <option value="Medium">Medium Roast</option>
                    <option value="Dark">Dark Roast</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Price, Stock, Weight */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Harga Dasar (Rp / 200g):
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Jumlah Stok:
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                    Berat Satuan (g):
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  />
                </div>
              </div>

              {/* Flavor Profile */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Karakter Rasa / Flavor Notes (pisahkan dengan koma):
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Chocolate, Caramel, Fruity, Honey"
                  value={formData.flavor}
                  onChange={(e) => setFormData({ ...formData, flavor: e.target.value })}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Deskripsi Lengkap Kopi:
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              {/* Image URL */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  URL Gambar / Foto Produk:
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 10 }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary btn-sm">
                  Batal
                </button>
                <button type="submit" className="btn btn-primary btn-sm">
                  {editingCoffee ? 'Simpan Perubahan' : 'Tambah ke Katalog'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirmId && (
        <div className="modal-backdrop" style={{ zIndex: 1300 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-heavy"
            style={{ maxWidth: 400, width: '100%', borderRadius: 20, padding: 24, textAlign: 'center' }}
          >
            <AlertTriangle size={36} color="#ef4444" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#fcf9f2', marginBottom: 8 }}>
              Hapus Produk Kopi Ini?
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: 20 }}>
              Tindakan ini akan menghapus produk secara permanen dari katalog marketplace.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setDeleteConfirmId(null)} className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                Batal
              </button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="btn btn-danger btn-sm" style={{ flex: 1 }}>
                Ya, Hapus
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
