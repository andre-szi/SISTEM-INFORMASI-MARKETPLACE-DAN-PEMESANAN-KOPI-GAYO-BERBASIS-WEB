This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Sistem Informasi Kopi Gayo Marketplace

Aplikasi web e-commerce untuk penjualan kopi specialty dari dataran tinggi Gayo, Aceh dengan sistem manajemen admin yang terpisah.

## ✨ Fitur Utama

### 👥 Untuk Customer:
- 🛍️ Browse marketplace kopi premium
- 🛒 Keranjang belanja & wishlist
- 💳 Sistem checkout & pembayaran (QRIS, Virtual Account)
- 📦 Tracking pesanan real-time (5 status)
- ⭐ Review & rating produk
- 🎫 Sistem kupon diskon

### 🔐 Untuk Admin (Protected):
- 📊 Dashboard penjualan & statistik
- ☕ CRUD manajemen produk kopi
- 🏷️ Kelola kategori
- 📋 Manajemen pesanan & status
- 👥 Data pelanggan
- 📈 Laporan penjualan

## 🔑 Login & Autentikasi

### Admin Login:
```
URL      : http://localhost:3000/admin/login
Email    : admin@kopigayo.id
Password : admin123
```

### Customer Login:
```
URL      : http://localhost:3000/auth
Email    : budi@mahasiswa.id
Password : customer123
```

📖 **Lihat dokumentasi lengkap:** `LOGIN_CREDENTIALS.md`

## 🛠️ Getting Started

### Install Dependencies:

### Install Dependencies:
```bash
npm install
```

### Run Development Server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Struktur Proyek

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── admin/             # 🔐 Admin Panel (Protected)
│   │   │   ├── login/        # Admin login page
│   │   │   ├── products/     # Kelola produk
│   │   │   ├── categories/   # Kelola kategori
│   │   │   ├── orders/       # Kelola pesanan
│   │   │   ├── customers/    # Data pelanggan
│   │   │   └── reports/      # Laporan penjualan
│   │   ├── auth/             # Customer login/register
│   │   ├── marketplace/      # Katalog kopi
│   │   ├── checkout/         # Checkout (protected)
│   │   ├── orders/           # Pesanan customer (protected)
│   │   └── page.js           # Homepage
│   ├── components/           # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── CartDrawer.js
│   │   ├── GuestPrompt.js   # 🆕 Guest protection
│   │   └── ...
│   ├── context/             # React Context
│   │   └── CoffeeContext.js # Global state & auth
│   ├── data/                # Initial data
│   │   └── initialData.js   # Users, products, orders
│   └── models/              # Type definitions
├── LOGIN_CREDENTIALS.md     # 🔑 Kredensial login
├── AUTHENTICATION_SUMMARY.md # 📖 Dokumentasi auth
└── README.md               # This file
```

## 🎨 Tech Stack

- **Framework:** Next.js 16.3.8 (App Router)
- **UI Library:** React 19.2.8
- **Styling:** Vanilla CSS (Glassmorphism Design)
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API
- **Storage:** LocalStorage (demo purposes)

## 🔐 Sistem Autentikasi

### Pemisahan Role:
✅ **Admin** - Login terpisah dengan validasi ketat
✅ **Customer** - Login/register untuk shopping
✅ **Guest** - Browse tanpa login

### Fitur Keamanan:
- Validasi email & password
- Session management (24 jam untuk admin)
- Protected routes dengan auto-redirect
- Role-based access control

**Dokumentasi lengkap:** `AUTHENTICATION_SUMMARY.md`

## 🧪 Testing Scenarios

### 1. Test Admin Access:
```
1. Buka: http://localhost:3000/admin/login
2. Login dengan kredensial admin
3. Explore dashboard, products, orders
4. Test CRUD operations
5. Logout
```

### 2. Test Customer Shopping:
```
1. Buka: http://localhost:3000/auth
2. Login sebagai customer
3. Browse marketplace, add to cart
4. Checkout & track order
5. View order history
```

### 3. Test Guest Restrictions:
```
1. Buka browser incognito
2. Browse homepage & marketplace
3. Try checkout → GuestPrompt muncul
4. Try /orders → GuestPrompt muncul
5. Try /admin → Redirect ke login
```

## 📦 Key Features

### OOP Architecture:
- Separation of Concerns (Admin vs Customer)
- Component-based architecture
- Context API untuk state management
- Reusable components & hooks

### Design System:
- **Admin Theme:** Merah Burgundy (#9f1239)
- **Customer Theme:** Emas/Amber (#f59e0b)
- Glassmorphism effects
- Responsive design
- Dark theme optimized

### Data Management:
- LocalStorage persistence
- Real-time state updates
- Order pipeline (5 status)
- Cart with coupon system

## 📝 Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run start  # Start production server
```

## 🐛 Troubleshooting

### "Tidak bisa login admin":
```bash
# Check kredensial di LOGIN_CREDENTIALS.md
# Clear localStorage:
localStorage.clear()
```

### "Page tidak muncul":
```bash
# Restart dev server
npm run dev
```

### "Error 404":
```bash
# Check routing di src/app/
# Pastikan file page.js ada
```

## 📚 Learn More

To learn more about Next.js and the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - interactive Next.js tutorial
- [Framer Motion](https://www.framer.com/motion/) - animation library
- [Lucide Icons](https://lucide.dev/) - beautiful icon set

## 🎯 Project Goals

Proyek ini dibuat untuk:
- ✅ Implementasi OOP principles dalam web development
- ✅ Sistem autentikasi dengan role-based access
- ✅ E-commerce flow lengkap (browse → cart → checkout → tracking)
- ✅ Admin panel untuk manajemen
- ✅ Responsive & modern UI/UX

## 📄 License & Credits

- **Project:** Kopi Gayo Marketplace
- **Course:** Principles of Programming Languages (POPL)
- **Institution:** Semester 5, 2026
- **Stack:** Next.js, React, Framer Motion

## 🤝 Contributing

This is an educational project. For questions or issues:
1. Check dokumentasi di folder `*.md`
2. Review code di `src/` folder
3. Contact course instructor

---

**Happy Coding! ☕️**

*Nikmati kopi specialty dari dataran tinggi Gayo!*
