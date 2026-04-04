import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Toast from '@/components/ui/Toast';
import ScrollToTop from '@/components/ui/ScrollToTop';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AUREL — Redefine Your Elegance | Premium Clothing',
  description: 'Discover AUREL\'s curated collection of premium clothing and accessories. Timeless elegance meets modern sophistication. Free shipping on orders over $150.',
  keywords: ['luxury fashion', 'premium clothing', 'designer wear', 'mens fashion', 'womens fashion', 'accessories'],
  openGraph: {
    title: 'AUREL — Redefine Your Elegance',
    description: 'Premium clothing and accessories for the modern connoisseur.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ScrollToTop />
            <Toast />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
