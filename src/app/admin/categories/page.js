'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tags, Plus, Edit2, Trash2, X, Award, Coffee, Sparkles } from 'lucide-react';
import { useCoffee } from '@/context/CoffeeContext';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCoffee();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: 'Coffee' });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: 'Coffee' });
    setModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description, icon: cat.icon || 'Coffee' });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    setModalOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 className="font-serif" style={{ fontSize: '1.8rem', color: '#fcf9f2', margin: 0 }}>
            Kelola Kategori Kopi (CRUD)
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '0.88rem', marginTop: 4 }}>
            Klasifikasi varietas dan metode pemrosesan kopi Gayo.
          </p>
        </div>

        <button onClick={handleOpenAdd} className="btn btn-primary" style={{ padding: '10px 18px', gap: 8 }}>
          <Plus size={18} />
          <span>Tambah Kategori Baru</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            className="glass-panel"
            style={{
              padding: 22,
              border: '1px solid rgba(217, 119, 6, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 16
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
                  <Coffee size={20} />
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => handleOpenEdit(cat)} style={{ padding: 6, color: '#38bdf8', cursor: 'pointer' }}>
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deleteCategory(cat.id)} style={{ padding: 6, color: '#ef4444', cursor: 'pointer' }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 style={{ fontSize: '1.1rem', color: '#fcf9f2', marginBottom: 6 }}>{cat.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', lineHeight: 1.5, margin: 0 }}>
                {cat.description}
              </p>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 8px', borderRadius: 4, width: 'fit-content' }}>
              ID: {cat.id}
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-backdrop" onClick={() => setModalOpen(false)} style={{ zIndex: 1200 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel-heavy"
            style={{ maxWidth: 460, width: '100%', borderRadius: 20, padding: 26, color: '#fcf9f2' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: 12 }}>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>
                {editingCategory ? 'Edit Kategori Kopi' : 'Tambah Kategori Kopi'}
              </h3>
              <button onClick={() => setModalOpen(false)} style={{ color: '#9ca3af' }}><X size={18} /></button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Nama Kategori:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Single Origin Gayo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d1c7bc', display: 'block', marginBottom: 6 }}>
                  Deskripsi Kategori:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Penjelasan varietas dan karakteristik pengelompokan..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary btn-sm">Batal</button>
                <button type="submit" className="btn btn-primary btn-sm">Simpan Kategori</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
