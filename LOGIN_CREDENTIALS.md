# 🔐 Kredensial Login - Sistem Kopi Gayo Marketplace

## 📋 Ringkasan Sistem Autentikasi

Sistem ini memiliki **2 jenis pengguna** yang terpisah dengan dashboard berbeda:

1. **Admin** - Pengelola sistem dengan akses penuh ke manajemen
2. **Customer** - Pembeli kopi dengan akses ke marketplace dan pemesanan

---

## 👨‍💼 LOGIN ADMIN

### Cara Akses:
Kunjungi: **`http://localhost:3000/admin/login`**

### Kredensial Admin:
```
Email    : admin@kopigayo.id
Password : admin123
```

### Fitur Admin:
- ✅ Dashboard ringkasan penjualan
- ✅ Kelola produk kopi (tambah, edit, hapus)
- ✅ Kelola kategori kopi
- ✅ Kelola pesanan (ubah status pesanan)
- ✅ Data pelanggan
- ✅ Laporan penjualan

### Keamanan:
- ⚠️ Admin **TIDAK BISA** diakses tanpa login
- ⚠️ Session admin tersimpan selama 24 jam
- ⚠️ Redirect otomatis ke `/admin/login` jika belum autentikasi
- ⚠️ Tidak ada "role switcher" - harus logout lalu login ulang

---

## 👤 LOGIN CUSTOMER

### Cara Akses:
Kunjungi: **`http://localhost:3000/auth`**

### Kredensial Customer (Demo):

**Customer 1:**
```
Email    : budi@mahasiswa.id
Password : customer123
```

**Customer 2:**
```
Email    : siti@customer.com
Password : customer123
```

### Fitur Customer:
- ✅ Browse marketplace kopi
- ✅ Tambah ke keranjang
- ✅ Checkout dan pembayaran
- ✅ Lacak pesanan
- ✅ Riwayat pembelian
- ✅ Wishlist kopi favorit

---

## 🚀 Quick Start

### 1. Akses sebagai Customer:
```
1. Buka http://localhost:3000
2. Klik "Login / Daftar" di banner atas
3. Pilih "Login sebagai Customer" atau input manual:
   - Email: budi@mahasiswa.id
   - Password: customer123
4. Redirect ke Marketplace
```

### 2. Akses sebagai Admin:
```
1. Buka http://localhost:3000/admin/login
2. Input kredensial:
   - Email: admin@kopigayo.id
   - Password: admin123
3. Redirect ke Admin Dashboard
```

---

## 🔄 Alur Autentikasi

### Halaman Publik (Tanpa Login):
- ✅ Homepage (`/`)
- ✅ Marketplace (`/marketplace`) - bisa browse tapi tidak bisa checkout
- ✅ Auth Customer (`/auth`)

### Halaman Protected (Butuh Login Customer):
- 🔒 Checkout (`/checkout`)
- 🔒 Orders Customer (`/orders`)
- 🔒 Cart (bisa tambah tapi tidak bisa checkout)

### Halaman Admin (Butuh Login Admin):
- 🔐 Admin Dashboard (`/admin`)
- 🔐 Admin Products (`/admin/products`)
- 🔐 Admin Categories (`/admin/categories`)
- 🔐 Admin Orders (`/admin/orders`)
- 🔐 Admin Customers (`/admin/customers`)
- 🔐 Admin Reports (`/admin/reports`)

---

## 🎨 Perbedaan Dashboard

### Dashboard Admin:
- Warna: **Merah Burgundy** (#9f1239)
- Layout: Sidebar + Main Content
- Header: Shield Icon + "Admin Panel"
- Fitur: Manajemen penuh sistem

### Dashboard Customer:
- Warna: **Emas/Amber** (#f59e0b)
- Layout: Navbar + Content
- Header: Coffee Icon + "KOPI GAYO"
- Fitur: Shopping & Orders

---

## 🔒 Keamanan

### Session Management:
- Admin session: 24 jam (localStorage)
- Customer session: Persistent (localStorage)

### Protection:
- Admin routes: Protected dengan `useEffect` di layout
- Redirect otomatis jika tidak terautentikasi
- Password tersimpan di state (demo purposes)

### Logout:
- Admin: Hapus session + redirect ke `/admin/login`
- Customer: Hapus session + redirect ke `/`

---

## 📝 Catatan Penting

1. **Tidak Ada Role Switcher Lagi**
   - Sistem sekarang memisahkan admin dan customer
   - Harus logout dan login ulang untuk ganti role

2. **Password Demo**
   - Ini adalah aplikasi demo
   - Password tidak di-hash (untuk kemudahan testing)
   - Produksi: gunakan bcrypt atau hash lainnya

3. **LocalStorage**
   - Data user tersimpan di localStorage
   - Clear localStorage untuk reset sistem

4. **Guest User**
   - Pengunjung tanpa login bisa browse
   - Tidak bisa checkout atau akses fitur premium

---

## 🐛 Troubleshooting

### "Tidak bisa akses admin":
```
Solusi: Pastikan login di /admin/login dengan kredensial admin
```

### "Redirect terus ke login":
```
Solusi: Clear localStorage atau pastikan kredensial benar
```

### "Lupa password":
```
Solusi: Lihat file ini atau check initialData.js
```

---

## 💡 Tips Development

### Test Admin Features:
```javascript
// Di browser console:
localStorage.setItem('gayo_user', JSON.stringify({
  id: 'user-admin',
  email: 'admin@kopigayo.id',
  role: 'admin',
  name: 'Admin Kopi Gayo'
}));

localStorage.setItem('gayo_admin_session', JSON.stringify({
  loggedIn: true,
  timestamp: Date.now()
}));

// Refresh halaman
```

### Clear All Data:
```javascript
// Di browser console:
localStorage.clear();
// Refresh halaman
```

---

## 📞 Kontak

Jika ada pertanyaan atau masalah, hubungi developer atau check file:
- `src/context/CoffeeContext.js` - Logic autentikasi
- `src/data/initialData.js` - Data user default
- `src/app/admin/login/page.js` - Halaman login admin
- `src/app/auth/page.js` - Halaman login customer

---

**Happy Coding! ☕️**
