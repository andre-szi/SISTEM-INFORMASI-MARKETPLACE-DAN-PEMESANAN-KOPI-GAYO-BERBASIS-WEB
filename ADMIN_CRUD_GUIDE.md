# 📦 Panduan CRUD Produk Kopi - Admin Dashboard & User Dashboard

## 🎯 Overview

Sistem kini menyediakan **dua dashboard terpisah dengan tampilan dan fungsi yang berbeda**:
1. **Dashboard User (`/dashboard`)**: Khusus pelanggan untuk melihat promo, poin loyalitas, pelacakan pesanan, dan katalog kopi yang siap dibeli.
2. **Dashboard Admin (`/admin`)**: Khusus pengelola dengan kontrol penuh untuk melakukan **CRUD (Create, Read, Update, Delete) barang/produk** yang tampil di Dashboard User, memantau omzet, dan mengubah stok barang secara real-time.

---

## 🔐 Akses & URL Dashboard

### 1. Dashboard User (Pelanggan):
```
URL      : http://localhost:3000/dashboard
Akses    : Publik / Customer (Demo: budi@mahasiswa.id)
Fungsi   : Katalog barang user, keranjang, tracking pesanan, poin & kupon
```

### 2. Dashboard Admin (Pengelola):
```
URL      : http://localhost:3000/admin
Login    : http://localhost:3000/admin/login
Email    : admin@kopigayo.id
Password : admin123
Fungsi   : CRUD barang user, kontrol stok (+/-), pipeline pesanan, analitik omzet
```

---

## ✨ Fitur CRUD yang Tersedia

### 1. **CREATE (Tambah Produk Baru)** ➕

**Langkah:**
1. Klik tombol **"Tambah Kopi Baru"** (hijau, pojok kanan atas)
2. Isi form dengan data produk:
   - **Nama Produk** - Contoh: "Gayo Arabica Honey Process"
   - **Kategori** - Pilih dari dropdown
   - **Origin** - Aceh Tengah / Bener Meriah / Gayo Lues
   - **Proses** - Honey / Wine / Natural / Washed
   - **Roasting** - Light / Medium / Dark
   - **Harga** - Harga per 200g (Rupiah)
   - **Stok** - Jumlah barang tersedia
   - **Berat Satuan** - Default 200g
   - **Flavor Notes** - Pisahkan dengan koma (Chocolate, Caramel, dll)
   - **Deskripsi** - Penjelasan lengkap
   - **URL Gambar** - Link gambar produk

3. Klik **"Tambah ke Katalog"**
4. Produk langsung muncul di marketplace!

**Hasil:**
- ✅ Produk baru tersimpan
- ✅ Muncul di tabel admin products
- ✅ **Otomatis muncul di marketplace customer**
- ✅ Data tersimpan di localStorage

---

### 2. **READ (Lihat & Cari Produk)** 🔍

**Fitur:**
- **Tabel lengkap** semua produk dengan thumbnail
- **Search bar** - Cari berdasar nama, origin, atau proses
- **Filter otomatis** saat mengetik
- **Counter** total produk terdaftar

**Informasi Ditampilkan:**
- 📷 Gambar thumbnail
- 🏷️ Nama produk & ID
- ⭐ Rating & jumlah review
- 📍 Origin & proses pasca-panen
- 🔥 Tingkat roasting
- 💰 Harga per 200g
- 📦 Stok tersedia
- ✏️ Tombol edit & hapus

---

### 3. **UPDATE (Edit Produk)** ✏️

**Langkah:**
1. Klik icon **pensil (Edit)** pada baris produk
2. Form terbuka dengan data yang sudah terisi
3. Ubah field yang ingin diupdate
4. Klik **"Simpan Perubahan"**

**Yang Bisa Diubah:**
- ✅ Semua field (nama, kategori, harga, stok, dll)
- ✅ **Update stok langsung** di kolom stok tanpa buka modal
  - Ketik angka baru di input stok → otomatis tersimpan
  - Indikator: "Kritis" (≤10) atau "Aman" (>10)

**Hasil:**
- ✅ Data produk diperbarui
- ✅ Perubahan langsung terlihat di tabel
- ✅ **Update otomatis di marketplace customer**
- ✅ Toast notification konfirmasi

---

### 4. **DELETE (Hapus Produk)** 🗑️

**Langkah:**
1. Klik icon **sampah merah (Delete)** pada baris produk
2. Modal konfirmasi muncul dengan peringatan
3. Klik **"Ya, Hapus"** untuk konfirmasi
4. Atau **"Batal"** untuk membatalkan

**Hasil:**
- ✅ Produk dihapus dari database
- ✅ Hilang dari tabel admin
- ✅ **Tidak muncul lagi di marketplace customer**
- ✅ Toast notification konfirmasi

⚠️ **Perhatian:** Penghapusan bersifat permanen!

---

## 🔄 Sinkronisasi Admin ↔ Customer

### Flow Data:

```
ADMIN DASHBOARD                    MARKETPLACE CUSTOMER
(CRUD Products)                    (Browse & Buy)
     ↓                                    ↑
     ├──[CREATE]───→ Add Product ────────┤
     ├──[UPDATE]───→ Edit Product ───────┤
     ├──[DELETE]───→ Remove Product ─────┤
     └──[STOCK]────→ Update Stock ───────┘
                          ↓
                  Context State
                (Real-time Sync)
                          ↓
                   localStorage
```

### Contoh Real-Time:
1. **Admin** tambah produk "Kopi Gayo Natural Process"
2. **Customer** refresh marketplace → produk baru muncul
3. **Admin** ubah harga dari 85k → 90k
4. **Customer** refresh → harga terupdate

---

## 📊 Validasi & Kontrol

### Field Required (Wajib):
- ✅ Nama produk
- ✅ Harga
- ✅ Stok
- ✅ Berat satuan

### Validasi Otomatis:
- ❌ Harga harus angka positif
- ❌ Stok harus angka (bisa 0)
- ❌ Nama tidak boleh kosong
- ⚠️ Stock ≤ 10 → Warning "Kritis"

### Default Values:
- Category: "Specialty Grade 1"
- Origin: "Aceh Tengah (Takengon)"
- Process: "Honey"
- Roast: "Medium"
- Weight: 200g
- Stock: 25
- Featured: false

---

## 💡 Tips & Best Practices

### 1. **Manajemen Stok**
```
✅ DO:
- Update stok langsung di kolom (tanpa modal)
- Set stok 0 jika habis (produk tetap tampil tapi tidak bisa dibeli)
- Monitor indikator "Kritis" untuk restock

❌ DON'T:
- Hapus produk hanya karena stok habis
- Biarkan stok negatif
```

### 2. **Foto Produk**
```
✅ DO:
- Gunakan URL gambar berkualitas tinggi
- Format: JPEG/PNG
- Aspect ratio: 1:1 atau 4:3
- Contoh source: Unsplash, Pexels

❌ DON'T:
- Foto blur atau kecil
- URL yang broken/mati
```

### 3. **Penamaan Produk**
```
✅ GOOD:
"Gayo Arabica Honey Process Premium"
"Takengon Wine Fermentation Single Origin"
"Bener Meriah Natural Sun-Dried Grade 1"

❌ BAD:
"Kopi 1"
"Test Product"
"abc123"
```

### 4. **Pricing Strategy**
```
Harga standar per 200g:
- Grade 1 Specialty: 75k - 95k
- Wine/Fermentation: 95k - 125k
- Limited Edition: 125k - 150k+

Multi-weight pricing otomatis:
- 200g: Base price
- 500g: Base × 2.35
- 1000g: Base × 4.4
```

---

## 🎨 UI Elements

### Status Indicators:
- 🟢 **Hijau** - Stok aman (> 10)
- 🔴 **Merah** - Stok kritis (≤ 10)
- 🟡 **Kuning** - Featured product
- ⭐ **Rating** - Customer reviews

### Action Buttons:
- ✏️ **Edit (Biru)** - Buka form edit
- 🗑️ **Delete (Merah)** - Konfirmasi hapus
- 💾 **Simpan** - Save changes
- ❌ **Batal** - Close modal

---

## 📱 Responsive Design

Dashboard produk sudah responsive:
- **Desktop** - Tabel penuh dengan semua kolom
- **Tablet** - Scroll horizontal untuk tabel
- **Mobile** - Stack layout dengan card view

---

## 🔧 Troubleshooting

### "Produk tidak muncul di marketplace"
```bash
Solusi:
1. Refresh browser customer
2. Check console untuk error
3. Pastikan produk tidak ter-filter category
4. Clear localStorage dan reload
```

### "Stok tidak update"
```bash
Solusi:
1. Ketik angka dan Enter
2. Klik area lain (blur event)
3. Refresh halaman
4. Check localStorage: gayo_coffees
```

### "Gambar tidak muncul"
```bash
Solusi:
1. Check URL gambar valid
2. Gunakan HTTPS (bukan HTTP)
3. Test URL di browser
4. Gunakan direct image link
```

---

## 📦 Data Structure

### Product Object:
```javascript
{
  id: "gayo-01",
  name: "Gayo Arabica Honey Process",
  categoryId: "cat-4",
  origin: "Aceh Tengah (Takengon)",
  process: "Honey",
  roast: "Medium",
  flavor: ["Caramel", "Chocolate", "Honey"],
  weight: 200,
  price: 85000,
  stock: 25,
  description: "Kopi premium dengan...",
  elevation: "1500 - 1650 mdpl",
  acidity: "Medium Clean",
  body: "Smooth & Full",
  image: "https://...",
  isFeatured: false,
  rating: 4.8,
  reviewCount: 42
}
```

---

## 🚀 Quick Actions

### Tambah Produk Cepat:
1. Klik "Tambah Kopi Baru"
2. Isi nama, harga, stok saja (field lain sudah ada default)
3. Klik "Tambah ke Katalog"
4. Done! ✅

### Bulk Update Stok:
1. Scan tabel untuk produk dengan stok kritis (merah)
2. Update langsung di kolom stok
3. Stok otomatis tersimpan saat blur/enter

### Quick Delete:
1. Klik icon sampah merah
2. Konfirmasi
3. Produk terhapus

---

## 📚 Related Pages

- **Customer Marketplace:** `/marketplace` - Lihat produk dari sisi customer
- **Admin Dashboard:** `/admin` - Overview metrics
- **Admin Categories:** `/admin/categories` - Kelola kategori
- **Admin Orders:** `/admin/orders` - Kelola pesanan

---

## ✅ Testing Checklist

Sebelum deploy, test semua fitur:

- [ ] **CREATE:** Tambah produk baru → Muncul di tabel ✓
- [ ] **CREATE:** Produk baru muncul di marketplace customer ✓
- [ ] **READ:** Search produk by nama ✓
- [ ] **READ:** Filter by origin/process ✓
- [ ] **UPDATE:** Edit nama produk → Tersimpan ✓
- [ ] **UPDATE:** Ubah harga → Update di marketplace ✓
- [ ] **UPDATE:** Update stok langsung di kolom ✓
- [ ] **DELETE:** Hapus produk → Hilang dari marketplace ✓
- [ ] **SYNC:** Perubahan langsung terlihat di customer ✓
- [ ] **STORAGE:** Data persist setelah refresh ✓

---

## 📞 Support

Jika ada masalah atau pertanyaan:
- Check file: `src/context/CoffeeContext.js` (Logic CRUD)
- Check file: `src/app/admin/products/page.js` (UI Admin)
- Check file: `src/app/marketplace/page.js` (UI Customer)
- Review: `LOGIN_CREDENTIALS.md` untuk akses

---

**Happy Managing! ☕️**

*Admin dapat mengelola produk dengan mudah, dan perubahan langsung terlihat di marketplace customer!*
