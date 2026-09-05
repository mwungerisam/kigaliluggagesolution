import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useShop, PageView } from '../context/ShopContext';
import { BUSINESS_CONFIG } from '../config/business';
import { ProductCategory } from '../types';
import { Logo } from './Logo';

const NAV_LINKS: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Shop Catalog', page: 'shop' },
  { label: 'About', page: 'about' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
];

const CATEGORY_ITEMS: ProductCategory[] = [
  'Suitcases',
  'Carry-On Luggage',
  'Luggage Sets',
  'Large Suitcases',
  'Travel Bags',
  'Travel Accessories',
];

export const Header: React.FC = () => {
  const { cartCount, openCart } = useCart();
  const {
    currentPage,
    navigateTo,
    navigateToCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('shop');
      setSearchOpen(false);
      setMobileMenuOpen(false);
    }
  };

  const handleNavClick = (page: PageView) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const handleCategorySelect = (category: ProductCategory) => {
    navigateToCategory(category);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-[#18181B] hover:text-black focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              id="mobile-search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#18181B] hover:text-black"
              aria-label="Toggle search"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Brand Logo matching official logo */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="text-left group cursor-pointer"
            >
              <Logo />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                id={`nav-link-${link.page}`}
                onClick={() => handleNavClick(link.page)}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors py-1 cursor-pointer ${
                  currentPage === link.page
                    ? 'text-[#990000] border-b-2 border-[#990000]'
                    : 'text-[#71717A] hover:text-[#990000]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Direct category shortcuts */}
            <button
              onClick={() => handleCategorySelect('Suitcases')}
              className="text-xs font-medium text-[#71717A] hover:text-[#18181B] uppercase tracking-wider transition-colors"
            >
              Suitcases
            </button>
            <button
              onClick={() => handleCategorySelect('Luggage Sets')}
              className="text-xs font-medium text-[#71717A] hover:text-[#18181B] uppercase tracking-wider transition-colors"
            >
              Sets
            </button>
            <button
              onClick={() => handleCategorySelect('Carry-On Luggage')}
              className="text-xs font-medium text-[#71717A] hover:text-[#18181B] uppercase tracking-wider transition-colors"
            >
              Cabin
            </button>
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center relative w-48 xl:w-56"
            >
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#F4F4F5] border border-transparent hover:border-[#E4E4E7] rounded-md focus:outline-none focus:border-[#18181B] focus:bg-white text-[#18181B] placeholder-[#A1A1AA] transition-all"
              />
              <Search className="w-3.5 h-3.5 text-[#71717A] absolute left-2.5 pointer-events-none" />
            </form>

            {/* Direct WhatsApp Action in header */}
            <a
              id="header-whatsapp-cta-btn"
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to order luggage.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#18181B] hover:text-black border border-[#E4E4E7] hover:border-[#18181B] rounded-md transition-colors"
            >
              <span>WhatsApp Inquiry</span>
            </a>

            {/* Shopping Bag Button */}
            <button
              id="header-cart-button"
              onClick={openCart}
              className="relative p-2 rounded-md hover:bg-[#F4F4F5] text-[#18181B] transition-colors flex items-center justify-center cursor-pointer"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1 -right-1 bg-[#990000] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {searchOpen && (
          <div className="lg:hidden pb-3 pt-1 border-t border-[#F4F4F5]">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search suitcases, sets, carry-on..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 text-xs bg-[#F4F4F5] border border-[#E4E4E7] rounded-lg focus:outline-none focus:border-[#18181B] text-[#18181B]"
              />
              <Search className="w-4 h-4 text-[#71717A] absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-[#71717A]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] z-50 bg-black/40">
          <div className="bg-white w-full border-b border-[#E4E4E7] p-6 shadow-xl space-y-6">
            <div className="space-y-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.page}
                  id={`mobile-nav-${link.page}`}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full text-left py-2.5 text-sm font-semibold tracking-wide uppercase transition-colors ${
                    currentPage === link.page ? 'text-black font-bold' : 'text-[#71717A]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="border-t border-[#F4F4F5] pt-4 space-y-2">
              <span className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-widest block">
                Collections
              </span>
              <div className="flex flex-wrap gap-2">
                {CATEGORY_ITEMS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className="px-3 py-1.5 text-xs text-[#18181B] bg-[#F4F4F5] hover:bg-[#E4E4E7] rounded-md transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-[#F4F4F5] pt-4 flex gap-3">
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="flex-1 py-2 text-center text-xs font-semibold text-[#18181B] border border-[#E4E4E7] rounded-md"
              >
                Call: {BUSINESS_CONFIG.phoneDisplay}
              </a>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kigali Luggage Solution, I would like to order luggage.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#18181B] rounded-md"
              >
                WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
