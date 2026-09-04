import React, { useEffect } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { AddedToCartToast } from './components/AddedToCartToast';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { MobileActionBar } from './components/MobileActionBar';

// Views
import { HomeView } from './views/HomeView';
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { CheckoutView } from './views/CheckoutView';
import { AboutView } from './views/AboutView';
import { ReviewsView } from './views/ReviewsView';
import { ContactView } from './views/ContactView';

const MainContent: React.FC = () => {
  const { currentView } = useShop();

  // Scroll to top whenever view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] text-[#18181B] font-sans selection:bg-[#18181B] selection:text-white pb-16 md:pb-0">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Global Header */}
      <Header />

      {/* 3. Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {currentView === 'shop' && <ShopView />}
        {currentView === 'product-detail' && <ProductDetailView />}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'about' && <AboutView />}
        {currentView === 'reviews' && <ReviewsView />}
        {currentView === 'contact' && <ContactView />}
      </main>

      {/* 4. Global Footer */}
      <Footer />

      {/* Global Modals & Float Components */}
      <ProductQuickView />
      <CartDrawer />
      <AddedToCartToast />
      <WhatsAppFloatingButton />
      <MobileActionBar />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <CartProvider>
        <MainContent />
      </CartProvider>
    </ShopProvider>
  );
}
