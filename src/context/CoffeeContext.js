'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_COFFEES,
  INITIAL_USERS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS
} from '../data/initialData';

const CoffeeContext = createContext(null);

export function CoffeeProvider({ children }) {
  // Initialize state with default data or localStorage fallback
  const [currentUser, setCurrentUser] = useState(null); // Start with no user logged in
  const [coffees, setCoffees] = useState(INITIAL_COFFEES);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [wishlist, setWishlist] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState(null);
  const [isOopModalOpen, setIsOopModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Hydrate from localStorage once mounted
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('gayo_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedCoffees = localStorage.getItem('gayo_coffees');
      if (savedCoffees) setCoffees(JSON.parse(savedCoffees));

      const savedCategories = localStorage.getItem('gayo_categories');
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedCart = localStorage.getItem('gayo_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedOrders = localStorage.getItem('gayo_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedReviews = localStorage.getItem('gayo_reviews');
      if (savedReviews) setReviews(JSON.parse(savedReviews));

      const savedWishlist = localStorage.getItem('gayo_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.warn('LocalStorage not available or corrupted, using defaults');
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(`Failed to save ${key} to localStorage`);
    }
  };

  // Toast notifier
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // User / Auth actions
  const switchRole = (targetRole) => {
    // Only allow switching if already logged in and not switching to admin
    if (targetRole === 'admin') {
      showToast('Silakan login sebagai admin melalui halaman login admin', 'error');
      return;
    }
    
    const target = INITIAL_USERS.find(u => u.role === targetRole) || {
      id: `user-${targetRole}`,
      name: 'Budi Santoso (Customer)',
      email: 'budi@mahasiswa.id',
      role: 'customer',
      phone: '0812-3456-7890',
      address: 'Jl. Merdeka No. 12, Takengon'
    };
    setCurrentUser(target);
    saveToStorage('gayo_user', target);
    showToast(`Beralih peran sebagai: ${target.role.toUpperCase()}`, 'info');
  };

  const login = (email, password) => {
    // Admin login validation
    if (email === 'admin@kopigayo.id' && password === 'admin123') {
      const admin = INITIAL_USERS[0];
      setCurrentUser(admin);
      saveToStorage('gayo_user', admin);
      saveToStorage('gayo_admin_session', JSON.stringify({ 
        loggedIn: true, 
        timestamp: Date.now() 
      }));
      showToast(`Selamat datang kembali, ${admin.name}!`);
      return { success: true, role: 'admin' };
    } 
    // Customer login (simplified)
    else if (email && password) {
      const customer = {
        ...INITIAL_USERS[1],
        email: email
      };
      setCurrentUser(customer);
      saveToStorage('gayo_user', customer);
      showToast(`Selamat datang kembali, ${customer.name}!`);
      return { success: true, role: 'customer' };
    } else {
      showToast('Email atau password tidak valid!', 'error');
      return { success: false };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gayo_user');
    localStorage.removeItem('gayo_admin_session');
    showToast('Anda telah berhasil keluar akun.', 'info');
  };

  const isAdminAuthenticated = () => {
    if (currentUser?.role !== 'admin') return false;
    
    try {
      const session = localStorage.getItem('gayo_admin_session');
      if (!session) return false;
      
      const { loggedIn, timestamp } = JSON.parse(session);
      const sessionAge = Date.now() - timestamp;
      const maxAge = 24 * 60 * 60 * 1000; // 24 hours
      
      return loggedIn && sessionAge < maxAge;
    } catch (e) {
      return false;
    }
  };

  // Cart actions
  const addToCart = (coffee, grindSize = 'Biji Utuh', weight = 200, quantity = 1) => {
    // Calculate price multiplier for weight
    let priceMultiplier = 1;
    if (weight === 500) priceMultiplier = 2.35;
    if (weight === 1000) priceMultiplier = 4.4;
    const finalPrice = Math.round(coffee.price * priceMultiplier);

    const existingIndex = cart.findIndex(
      item => item.coffeeId === coffee.id && item.grindSize === grindSize && item.weight === weight
    );

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
    } else {
      const newItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        coffeeId: coffee.id,
        coffee: {
          id: coffee.id,
          name: coffee.name,
          image: coffee.image,
          origin: coffee.origin,
          process: coffee.process,
          roast: coffee.roast
        },
        grindSize,
        weight,
        quantity,
        price: finalPrice
      };
      updatedCart = [...cart, newItem];
    }

    setCart(updatedCart);
    saveToStorage('gayo_cart', updatedCart);
    showToast(`Berhasil menambahkan ${coffee.name} (${grindSize}, ${weight}g) ke keranjang!`);
  };

  const updateCartQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updated = cart.map(item =>
      item.id === cartItemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);
    saveToStorage('gayo_cart', updated);
  };

  const removeFromCart = (cartItemId) => {
    const updated = cart.filter(item => item.id !== cartItemId);
    setCart(updated);
    saveToStorage('gayo_cart', updated);
    showToast('Produk dihapus dari keranjang.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage('gayo_cart', []);
  };

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'GAYO10') {
      setAppliedCoupon({ code: 'GAYO10', discountPercent: 10, label: 'Diskon 10% Member Gayo' });
      showToast('Kupon GAYO10 berhasil dipasang! (Diskon 10%)');
      return true;
    } else if (cleanCode === 'GAYOPREMIUM') {
      setAppliedCoupon({ code: 'GAYOPREMIUM', discountPercent: 15, label: 'Diskon 15% Member Spesial' });
      showToast('Kupon GAYOPREMIUM berhasil dipasang! (Diskon 15%)');
      return true;
    } else {
      showToast('Kode kupon tidak valid. Coba: GAYO10 atau GAYOPREMIUM', 'error');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Kupon diskon dihapus.', 'info');
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartDiscount = appliedCoupon ? Math.round(cartSubtotal * (appliedCoupon.discountPercent / 100)) : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Order Actions
  const createOrder = ({
    shippingAddress,
    courier = 'JNE Reguler',
    shippingCost = 18000,
    paymentMethod = 'QRIS'
  }) => {
    if (cart.length === 0) {
      showToast('Keranjang Anda kosong!', 'error');
      return null;
    }

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const finalAmount = cartTotal + shippingCost;

    const newOrder = {
      id: orderId,
      userId: currentUser?.id || 'guest',
      customerName: currentUser?.name || 'Pelanggan Kopi Gayo',
      customerEmail: currentUser?.email || 'customer@kopigayo.id',
      customerPhone: currentUser?.phone || '0812-3456-7890',
      shippingAddress: shippingAddress || currentUser?.address || 'Takengon, Aceh Tengah',
      courier,
      shippingCost,
      items: cart.map(item => ({
        coffeeId: item.coffeeId,
        name: item.coffee.name,
        grindSize: item.grindSize,
        weight: item.weight,
        quantity: item.quantity,
        price: item.price,
        image: item.coffee.image
      })),
      payment: {
        method: paymentMethod,
        status: paymentMethod === 'QRIS' ? 'Pending' : 'Pending',
        transactionId: `TRX-${Date.now().toString().slice(-8)}`,
        amount: finalAmount,
        paidAt: null
      },
      status: 'Menunggu Pembayaran',
      trackingNumber: `GAYO-${courier.split(' ')[0]}-${Math.floor(10000000 + Math.random() * 90000000)}`,
      totalAmount: finalAmount,
      createdAt: new Date().toISOString()
    };

    // Deduct stocks
    const updatedCoffees = coffees.map(c => {
      const cartItem = cart.find(ci => ci.coffeeId === c.id);
      if (cartItem) {
        return { ...c, stock: Math.max(0, c.stock - cartItem.quantity) };
      }
      return c;
    });
    setCoffees(updatedCoffees);
    saveToStorage('gayo_coffees', updatedCoffees);

    // Save order
    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    saveToStorage('gayo_orders', updatedOrders);

    // Clear cart
    clearCart();
    setAppliedCoupon(null);
    showToast(`Pesanan #${orderId} berhasil dibuat! Segera lakukan pembayaran.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        let paymentStatus = ord.payment.status;
        let paidAt = ord.payment.paidAt;
        if (newStatus !== 'Menunggu Pembayaran' && paymentStatus === 'Pending') {
          paymentStatus = 'Paid';
          paidAt = new Date().toISOString();
        }
        return {
          ...ord,
          status: newStatus,
          payment: { ...ord.payment, status: paymentStatus, paidAt }
        };
      }
      return ord;
    });

    setOrders(updated);
    saveToStorage('gayo_orders', updated);
    showToast(`Status Pesanan #${orderId} diubah menjadi: ${newStatus}`);
  };

  const payOrder = (orderId) => {
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status: 'Dikonfirmasi',
          payment: {
            ...ord.payment,
            status: 'Paid',
            paidAt: new Date().toISOString()
          }
        };
      }
      return ord;
    });
    setOrders(updated);
    saveToStorage('gayo_orders', updated);
    showToast(`Pembayaran Pesanan #${orderId} berhasil dikonfirmasi!`, 'success');
  };

  const completeOrder = (orderId) => {
    updateOrderStatus(orderId, 'Selesai');
    showToast(`Terima kasih! Pesanan #${orderId} telah selesai.`);
  };

  // Product CRUD (Admin)
  const addCoffee = (newCoffeeData) => {
    const id = `gayo-${Date.now().toString().slice(-4)}`;
    const newCoffee = {
      ...newCoffeeData,
      id,
      rating: 5.0,
      reviewCount: 0,
      price: Number(newCoffeeData.price),
      stock: Number(newCoffeeData.stock),
      weight: Number(newCoffeeData.weight || 200),
      flavor: Array.isArray(newCoffeeData.flavor)
        ? newCoffeeData.flavor
        : newCoffeeData.flavor.split(',').map(f => f.trim())
    };
    const updated = [newCoffee, ...coffees];
    setCoffees(updated);
    saveToStorage('gayo_coffees', updated);
    showToast(`Produk kopi "${newCoffee.name}" berhasil ditambahkan!`);
    return newCoffee;
  };

  const updateCoffee = (id, updatedData) => {
    const updated = coffees.map(c => {
      if (c.id === id) {
        return {
          ...c,
          ...updatedData,
          price: Number(updatedData.price || c.price),
          stock: Number(updatedData.stock || c.stock),
          flavor: Array.isArray(updatedData.flavor)
            ? updatedData.flavor
            : updatedData.flavor.split(',').map(f => f.trim())
        };
      }
      return c;
    });
    setCoffees(updated);
    saveToStorage('gayo_coffees', updated);
    showToast('Data produk kopi berhasil diperbarui!');
  };

  const deleteCoffee = (id) => {
    const updated = coffees.filter(c => c.id !== id);
    setCoffees(updated);
    saveToStorage('gayo_coffees', updated);
    showToast('Produk kopi berhasil dihapus dari katalog.', 'info');
  };

  const updateStock = (id, newStock) => {
    const updated = coffees.map(c => c.id === id ? { ...c, stock: Number(newStock) } : c);
    setCoffees(updated);
    saveToStorage('gayo_coffees', updated);
    showToast('Stok berhasil diperbarui!');
  };

  // Category CRUD (Admin)
  const addCategory = (categoryData) => {
    const id = `cat-${Date.now().toString().slice(-4)}`;
    const newCat = { ...categoryData, id };
    const updated = [...categories, newCat];
    setCategories(updated);
    saveToStorage('gayo_categories', updated);
    showToast(`Kategori "${newCat.name}" berhasil dibuat!`);
  };

  const updateCategory = (id, categoryData) => {
    const updated = categories.map(cat => cat.id === id ? { ...cat, ...categoryData } : cat);
    setCategories(updated);
    saveToStorage('gayo_categories', updated);
    showToast('Kategori berhasil diperbarui!');
  };

  const deleteCategory = (id) => {
    const updated = categories.filter(cat => cat.id !== id);
    setCategories(updated);
    saveToStorage('gayo_categories', updated);
    showToast('Kategori berhasil dihapus.', 'info');
  };

  // Reviews
  const addReview = ({ coffeeId, rating, comment }) => {
    const newRev = {
      id: `rev-${Date.now()}`,
      coffeeId,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Pelanggan Kopi Gayo',
      rating: Number(rating),
      comment,
      createdAt: new Date().toISOString()
    };
    const updatedReviews = [newRev, ...reviews];
    setReviews(updatedReviews);
    saveToStorage('gayo_reviews', updatedReviews);

    // Update coffee rating
    const coffeeRevs = updatedReviews.filter(r => r.coffeeId === coffeeId);
    const avgRating = (coffeeRevs.reduce((acc, r) => acc + r.rating, 0) / coffeeRevs.length).toFixed(1);
    const updatedCoffees = coffees.map(c => {
      if (c.id === coffeeId) {
        return { ...c, rating: parseFloat(avgRating), reviewCount: coffeeRevs.length };
      }
      return c;
    });
    setCoffees(updatedCoffees);
    saveToStorage('gayo_coffees', updatedCoffees);

    showToast('Terima kasih! Ulasan kopi Anda telah dipublikasikan.');
  };

  // Wishlist
  const toggleWishlist = (coffeeId) => {
    let updated;
    if (wishlist.includes(coffeeId)) {
      updated = wishlist.filter(id => id !== coffeeId);
      showToast('Kopi dihapus dari daftar impian.', 'info');
    } else {
      updated = [...wishlist, coffeeId];
      showToast('Kopi ditambahkan ke daftar impian!', 'success');
    }
    setWishlist(updated);
    saveToStorage('gayo_wishlist', updated);
  };

  return (
    <CoffeeContext.Provider
      value={{
        // Auth & User
        currentUser,
        switchRole,
        login,
        logout,
        isAdminAuthenticated,

        // Coffees
        coffees,
        addCoffee,
        updateCoffee,
        deleteCoffee,
        updateStock,

        // Categories
        categories,
        addCategory,
        updateCategory,
        deleteCategory,

        // Cart
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartCount,
        appliedCoupon,
        applyCouponCode,
        removeCoupon,

        // Orders
        orders,
        createOrder,
        updateOrderStatus,
        payOrder,
        completeOrder,

        // Reviews & Wishlist
        reviews,
        addReview,
        wishlist,
        toggleWishlist,

        // UI Helpers
        isCartOpen,
        setIsCartOpen,
        activeProductModal,
        setActiveProductModal,
        isOopModalOpen,
        setIsOopModalOpen,
        toasts,
        showToast
      }}
    >
      {children}
    </CoffeeContext.Provider>
  );
}

export function useCoffee() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error('useCoffee must be used within a CoffeeProvider');
  }
  return context;
}
