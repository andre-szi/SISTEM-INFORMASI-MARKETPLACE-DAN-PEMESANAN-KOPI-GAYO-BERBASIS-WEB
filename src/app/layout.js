import './globals.css';
import { CoffeeProvider } from '@/context/CoffeeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Toast from '@/components/Toast';
import ProductDetailModal from '@/components/ProductDetailModal';

export const metadata = {
  title: 'Kopi Gayo Marketplace - Highland Specialty Coffee & Pemesanan Online',
  description: 'Sistem Informasi Marketplace dan Pemesanan Kopi Gayo Berbasis Web. Eksplorasi single origin Aceh Tengah, Bener Meriah, proses Wine, Honey, dan Natural.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <CoffeeProvider>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - var(--nav-height) - 300px)' }}>
            {children}
          </main>
          <Footer />
          <CartDrawer />
          <ProductDetailModal />
          <Toast />
        </CoffeeProvider>
      </body>
    </html>
  );
}
