/**
 * SISTEM INFORMASI MARKETPLACE & PEMESANAN KOPI GAYO
 * Model Entitas & Tipe Data Produk Kopi Gayo
 * 
 * Objek yang didefinisikan:
 * 1. User (Admin, Customer)
 * 2. Category
 * 3. Coffee
 * 4. Cart
 * 5. CartItem
 * 6. Order
 * 7. OrderItem
 * 8. Payment
 * 9. Review
 */

export class User {
  constructor({ id, name, email, role = 'customer', phone = '', address = '', avatar = '' }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role; // 'customer' | 'admin'
    this.phone = phone;
    this.address = address;
    this.avatar = avatar;
    this.createdAt = new Date().toISOString();
  }
}

export class Category {
  constructor({ id, name, description, icon = 'Coffee' }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
  }
}

export class Coffee {
  constructor({
    id,
    name,
    categoryId,
    origin,         // Aceh Tengah, Bener Meriah, Gayo Lues
    process,        // Washed, Natural, Honey, Wine
    roast,          // Light, Medium, Dark
    flavor,         // Array string: ['Caramel', 'Chocolate', 'Fruity']
    weight = 200,   // gram
    price,
    stock,
    description,
    elevation = '1400-1600 mdpl',
    acidity = 'Medium-High',
    body = 'Full Body',
    image,
    rating = 4.8,
    reviewCount = 0,
    isFeatured = false
  }) {
    this.id = id;
    this.name = name;
    this.categoryId = categoryId;
    this.origin = origin;
    this.process = process;
    this.roast = roast;
    this.flavor = Array.isArray(flavor) ? flavor : [flavor];
    this.weight = weight;
    this.price = price;
    this.stock = stock;
    this.description = description;
    this.elevation = elevation;
    this.acidity = acidity;
    this.body = body;
    this.image = image;
    this.rating = rating;
    this.reviewCount = reviewCount;
    this.isFeatured = isFeatured;
  }
}

export class CartItem {
  constructor({ id, coffeeId, coffee, grindSize = 'Biji Utuh', weight = 200, quantity = 1, price }) {
    this.id = id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    this.coffeeId = coffeeId;
    this.coffee = coffee;
    this.grindSize = grindSize; // 'Biji Utuh' | 'Giling Kasar' | 'Giling Sedang' | 'Giling Halus'
    this.weight = weight; // 200, 500, 1000
    this.quantity = quantity;
    this.price = price || coffee.price;
  }

  getSubtotal() {
    return this.price * this.quantity;
  }
}

export class Cart {
  constructor({ userId, items = [] }) {
    this.userId = userId;
    this.items = items.map(item => item instanceof CartItem ? item : new CartItem(item));
  }

  getTotalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

export class OrderItem {
  constructor({ coffeeId, name, grindSize, weight, quantity, price, image }) {
    this.coffeeId = coffeeId;
    this.name = name;
    this.grindSize = grindSize;
    this.weight = weight;
    this.quantity = quantity;
    this.price = price;
    this.image = image;
  }
}

export class Payment {
  constructor({ method, status = 'Pending', transactionId, amount, paidAt = null }) {
    this.method = method; // 'QRIS' | 'BCA Virtual Account' | 'Mandiri VA' | 'GoPay' | 'OVO'
    this.status = status; // 'Pending' | 'Paid' | 'Failed'
    this.transactionId = transactionId || `TRX-${Date.now()}`;
    this.amount = amount;
    this.paidAt = paidAt;
  }
}

export class Order {
  constructor({
    id,
    userId,
    customerName,
    customerEmail,
    customerPhone,
    shippingAddress,
    courier,        // 'JNE Reguler' | 'J&T Express' | 'SiCepat BEST'
    shippingCost = 15000,
    items = [],
    payment,
    status = 'Menunggu Pembayaran', // 'Menunggu Pembayaran' | 'Dikonfirmasi' | 'Diproses' | 'Dikirim' | 'Selesai'
    trackingNumber = '',
    totalAmount,
    createdAt = new Date().toISOString()
  }) {
    this.id = id || `ORD-${Date.now().toString().slice(-6)}`;
    this.userId = userId;
    this.customerName = customerName;
    this.customerEmail = customerEmail;
    this.customerPhone = customerPhone;
    this.shippingAddress = shippingAddress;
    this.courier = courier;
    this.shippingCost = shippingCost;
    this.items = items;
    this.payment = payment;
    this.status = status;
    this.trackingNumber = trackingNumber || `GAYO-${Math.floor(10000000 + Math.random() * 90000000)}`;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
  }
}

export class Review {
  constructor({ id, coffeeId, userId, userName, rating, comment, createdAt = new Date().toISOString() }) {
    this.id = id || `rev_${Date.now()}`;
    this.coffeeId = coffeeId;
    this.userId = userId;
    this.userName = userName;
    this.rating = rating;
    this.comment = comment;
    this.createdAt = createdAt;
  }
}
