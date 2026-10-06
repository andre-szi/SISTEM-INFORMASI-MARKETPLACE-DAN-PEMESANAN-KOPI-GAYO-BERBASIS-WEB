/**
 * Data Awal Sistem Informasi Marketplace Kopi Gayo
 * Terdiri dari Kategori, Produk Kopi Otentik Dataran Tinggi Gayo,
 * Akun Pengguna Demo, dan Riwayat Pesanan Simulasi.
 */

export const INITIAL_CATEGORIES = [
  {
    id: 'cat-1',
    name: 'Specialty Grade 1',
    description: 'Biji kopi pilihan dengan defect minimal dan cita rasa kompleks khas dataran tinggi Gayo.',
    icon: 'Award'
  },
  {
    id: 'cat-2',
    name: 'Single Origin Gayo',
    description: 'Kopi murni dari satu perkebunan spesifik di Takengon dan Bener Meriah.',
    icon: 'MapPin'
  },
  {
    id: 'cat-3',
    name: 'Wine & Fermentation',
    description: 'Proses fermentasi alami anaerobik yang menghasilkan aroma anggur dan buah eksotis.',
    icon: 'Flame'
  },
  {
    id: 'cat-4',
    name: 'Honey & Natural',
    description: 'Pengeringan dengan lapisan mucilage untuk rasa manis madu dan body karamel yang kental.',
    icon: 'Sparkles'
  },
  {
    id: 'cat-5',
    name: 'Espresso & Dark Roast',
    description: 'Roasting gelap intens dengan crema tebal, ideal untuk espresso machine dan moka pot.',
    icon: 'Coffee'
  }
];

export const INITIAL_COFFEES = [
  {
    id: 'gayo-01',
    name: 'Gayo Arabica Honey Process',
    categoryId: 'cat-4',
    origin: 'Aceh Tengah (Takengon)',
    process: 'Honey',
    roast: 'Medium',
    flavor: ['Caramel', 'Chocolate', 'Honey', 'Nutty'],
    weight: 200,
    price: 85000,
    stock: 25,
    description: 'Kopi Arabika Gayo dengan metode Honey Process di mana biji dikeringkan bersama sebagian lendir buah (mucilage). Menghasilkan rasa manis alami yang lembut, aftertaste karamel gurih, dan keasaman seimbang.',
    elevation: '1500 - 1650 mdpl',
    acidity: 'Medium Clean',
    body: 'Smooth & Syrupy',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 38,
    isFeatured: true
  },
  {
    id: 'gayo-02',
    name: 'Gayo Highland Wine Process',
    categoryId: 'cat-3',
    origin: 'Bener Meriah',
    process: 'Wine',
    roast: 'Light',
    flavor: ['Fruity', 'Winey', 'Blackcurrant', 'Floral'],
    weight: 200,
    price: 115000,
    stock: 14,
    description: 'Masterpiece kopi Gayo dari perkebunan Bener Meriah. Biji ceri merah difermentasi selama 30-45 hari dalam tabung anaerobik kedap udara. Memberikan sensasi aroma anggur merah matang yang meledak di lidah tanpa kandungan alkohol.',
    elevation: '1600 - 1750 mdpl',
    acidity: 'Bright & Juicy',
    body: 'Medium Round',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 42,
    isFeatured: true
  },
  {
    id: 'gayo-03',
    name: 'Gayo Arabica Full Washed Classic',
    categoryId: 'cat-2',
    origin: 'Aceh Tengah',
    process: 'Washed',
    roast: 'Medium',
    flavor: ['Chocolate', 'Citrus', 'Brown Sugar'],
    weight: 200,
    price: 78000,
    stock: 35,
    description: 'Karakter otentik kopi Gayo legendaris. Diproses basah murni (Full Washed) menghasilkan profil cup yang sangat bersih (clean cup), notes cokelat hitam pekat dipadu sentuhan rempah dan jeruk keprok khas Aceh.',
    elevation: '1400 - 1550 mdpl',
    acidity: 'Crisp & Citrusy',
    body: 'Medium Body',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 29,
    isFeatured: false
  },
  {
    id: 'gayo-04',
    name: 'Gayo Natural Sun-Dried Specialty',
    categoryId: 'cat-4',
    origin: 'Bener Meriah',
    process: 'Natural',
    roast: 'Medium',
    flavor: ['Fruity', 'Caramel', 'Strawberry', 'Sweet'],
    weight: 200,
    price: 92000,
    stock: 18,
    description: 'Ceri kopi pilihan dikeringkan utuh di bawah terik matahari dataran tinggi Gayo di atas meja pengeringan bertingkat. Penyerapan gula alami dari buah ceri menghasilkan cita rasa buah berry manis dan body yang tebal.',
    elevation: '1500 - 1700 mdpl',
    acidity: 'Mellow Fruity',
    body: 'Heavy & Bold',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 31,
    isFeatured: true
  },
  {
    id: 'gayo-05',
    name: 'Gayo Dark Roast Espresso Blend',
    categoryId: 'cat-5',
    origin: 'Aceh Tengah',
    process: 'Washed',
    roast: 'Dark',
    flavor: ['Dark Chocolate', 'Nutty', 'Smoky', 'Molasses'],
    weight: 200,
    price: 75000,
    stock: 40,
    description: 'Diformulasikan khusus bagi pecinta kopi kental, cafe latte, dan minuman espresso berbasis susu. Tingkat sangrai Dark yang tepat memunculkan minyak alami tanpa rasa gosong, menghasilkan crema emas pekat.',
    elevation: '1350 - 1500 mdpl',
    acidity: 'Low / Lembut di Lambung',
    body: 'Very Heavy & Crema Rich',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 23,
    isFeatured: false
  },
  {
    id: 'gayo-06',
    name: 'Gayo Peaberry (Kopi Lanang)',
    categoryId: 'cat-1',
    origin: 'Gayo Lues',
    process: 'Honey',
    roast: 'Medium',
    flavor: ['Floral', 'Chocolate', 'Almond', 'Complex'],
    weight: 200,
    price: 125000,
    stock: 10,
    description: 'Biji kopi bulat tunggal (peaberry) yang langka, hanya 5% dari setiap panen raya kopi Gayo. Mengandung konsentrasi nutrisi dan kafein lebih padat dengan aroma rempah bunga serta kelembutan cokelat susu.',
    elevation: '1650 - 1800 mdpl',
    acidity: 'Balanced & Elegant',
    body: 'Full & Silky',
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 19,
    isFeatured: true
  },
  {
    id: 'gayo-07',
    name: 'Gayo Pantan Musara Micro-Lot',
    categoryId: 'cat-1',
    origin: 'Aceh Tengah (Pegasing)',
    process: 'Washed',
    roast: 'Light',
    flavor: ['Floral', 'Jasmine', 'Peach', 'Earl Grey'],
    weight: 200,
    price: 105000,
    stock: 12,
    description: 'Berasal dari lereng bukit Pantan Musara, Pegasing, Takengon. Dikenal di dunia internasional sebagai salah satu kopi Gayo dengan profil menyerupai kopi Ethiopia berkat aroma melati dan rasa buah persik segar.',
    elevation: '1550 - 1700 mdpl',
    acidity: 'High Bright & Tea-like',
    body: 'Light & Delicate',
    image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviewCount: 16,
    isFeatured: false
  },
  {
    id: 'gayo-08',
    name: 'Gayo Bener Meriah Anaerobic Natural',
    categoryId: 'cat-3',
    origin: 'Bener Meriah',
    process: 'Natural',
    roast: 'Medium',
    flavor: ['Fruity', 'Mango', 'Caramel', 'Sweet'],
    weight: 200,
    price: 98000,
    stock: 22,
    description: 'Fermentasi tanpa oksigen selama 96 jam sebelum penjemuran menghasilkan rasa buah tropis matang seperti mangga gedong, diiringi rasa manis karamel cair yang pekat dan aroma yang semerbak.',
    elevation: '1500 - 1650 mdpl',
    acidity: 'Juicy Tropical',
    body: 'Velvety Smooth',
    image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 15,
    isFeatured: false
  }
];

export const INITIAL_USERS = [
  {
    id: 'user-admin',
    name: 'Admin Kopi Gayo',
    email: 'admin@kopigayo.id',
    password: 'admin123', // Password untuk demo
    role: 'admin',
    phone: '0812-9988-7766',
    address: 'Jl. Takengon - Bireuen No. 45, Aceh Tengah',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-customer',
    name: 'Budi Santoso',
    email: 'budi@mahasiswa.id',
    password: 'customer123', // Password untuk demo
    role: 'customer',
    phone: '0813-1234-5678',
    address: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan, DKI Jakarta 12160',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    id: 'user-customer-2',
    name: 'Siti Nurhaliza',
    email: 'siti@customer.com',
    password: 'customer123',
    role: 'customer',
    phone: '0821-5555-6666',
    address: 'Jl. Sudirman No. 100, Bandung, Jawa Barat',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80'
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-892101',
    userId: 'user-customer',
    customerName: 'Budi Santoso (Customer Demo)',
    customerEmail: 'budi@mahasiswa.id',
    customerPhone: '0813-1234-5678',
    shippingAddress: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan 12160',
    courier: 'JNE Reguler',
    shippingCost: 18000,
    items: [
      {
        coffeeId: 'gayo-01',
        name: 'Gayo Arabica Honey Process',
        grindSize: 'Giling Sedang (V60)',
        weight: 200,
        quantity: 2,
        price: 85000,
        image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=400&q=80'
      },
      {
        coffeeId: 'gayo-02',
        name: 'Gayo Highland Wine Process',
        grindSize: 'Biji Utuh',
        weight: 200,
        quantity: 1,
        price: 115000,
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80'
      }
    ],
    payment: {
      method: 'QRIS',
      status: 'Paid',
      transactionId: 'TRX-QRIS-992384',
      amount: 303000,
      paidAt: '2026-10-04T14:30:00Z'
    },
    status: 'Dikirim', // 'Menunggu Pembayaran' | 'Dikonfirmasi' | 'Diproses' | 'Dikirim' | 'Selesai'
    trackingNumber: 'GAYO-JNE-88291039',
    totalAmount: 303000,
    createdAt: '2026-10-04T14:20:00Z'
  },
  {
    id: 'ORD-892102',
    userId: 'user-customer',
    customerName: 'Budi Santoso (Customer Demo)',
    customerEmail: 'budi@mahasiswa.id',
    customerPhone: '0813-1234-5678',
    shippingAddress: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan 12160',
    courier: 'SiCepat BEST',
    shippingCost: 22000,
    items: [
      {
        coffeeId: 'gayo-06',
        name: 'Gayo Peaberry (Kopi Lanang)',
        grindSize: 'Giling Halus (Espresso)',
        weight: 500,
        quantity: 1,
        price: 295000,
        image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?auto=format&fit=crop&w=400&q=80'
      }
    ],
    payment: {
      method: 'BCA Virtual Account',
      status: 'Paid',
      transactionId: 'TRX-BCA-100293',
      amount: 317000,
      paidAt: '2026-10-02T10:15:00Z'
    },
    status: 'Selesai',
    trackingNumber: 'GAYO-SCP-55201948',
    totalAmount: 317000,
    createdAt: '2026-10-02T09:45:00Z'
  },
  {
    id: 'ORD-892103',
    userId: 'user-customer',
    customerName: 'Budi Santoso (Customer Demo)',
    customerEmail: 'budi@mahasiswa.id',
    customerPhone: '0813-1234-5678',
    shippingAddress: 'Jl. Melati No. 18, Kebayoran Baru, Jakarta Selatan 12160',
    courier: 'J&T Express',
    shippingCost: 15000,
    items: [
      {
        coffeeId: 'gayo-04',
        name: 'Gayo Natural Sun-Dried Specialty',
        grindSize: 'Giling Sedang (V60)',
        weight: 200,
        quantity: 1,
        price: 92000,
        image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80'
      }
    ],
    payment: {
      method: 'QRIS',
      status: 'Pending',
      transactionId: 'TRX-QRIS-339201',
      amount: 107000,
      paidAt: null
    },
    status: 'Menunggu Pembayaran',
    trackingNumber: 'GAYO-JNT-77192038',
    totalAmount: 107000,
    createdAt: '2026-10-06T00:15:00Z'
  }
];

export const INITIAL_REVIEWS = [
  {
    id: 'rev-1',
    coffeeId: 'gayo-01',
    userId: 'user-customer',
    userName: 'Budi Santoso',
    rating: 5,
    comment: 'Honey process-nya luar biasa manis! Dicoba seduh manual brew rasanya lembut banget dan aftertaste karamelnya nempel lama.',
    createdAt: '2026-10-03T11:20:00Z'
  },
  {
    id: 'rev-2',
    coffeeId: 'gayo-02',
    userId: 'user-anita',
    userName: 'Anita Rahmawati',
    rating: 5,
    comment: 'Aroma wine-nya juara! Sangat wangi buah anggur segar dan asamnya menyegarkan, tidak bikin mual.',
    createdAt: '2026-10-04T16:45:00Z'
  }
];
