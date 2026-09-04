import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  Briefcase,
  ChevronRight,
  Truck,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useShop, PageView } from '../context/ShopContext';
import { BUSINESS_CONFIG } from '../config/business';
import { ProductCategory } from '../types';

const NAV_LINKS: { label: string; page: PageView }[] = [
  { label: 'Home', page: 'home' },
  { label: 'Shop All', page: 'shop' },
  { label: 'About Us', page: 'about' },
  { label: 'Reviews', page: 'reviews' },
  { label: 'Contact', page: 'contact' },
];

const CATEGORY_ITEMS: ProductCategory[] = [
  'Suitcases',
  'Carry-On Luggage',
  'Large Suitcases',
  'Luggage Sets',
  'Travel Bags',
  'Travel Accessories',
  'Pillows',
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
  const [categoriesOpen, setCategoriesOpen] = useState(false);

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
    setCategoriesOpen(false);
  };

  const handleCategorySelect = (category: ProductCategory) => {
    navigateToCategory(category);
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu toggle */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-slate-700 hover:text-slate-950 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              id="mobile-search-toggle-btn"
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 ml-1 text-slate-700 hover:text-slate-950 lg:hidden"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center">
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left group"
            >
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:bg-purple-900 transition-colors border border-slate-800">
                <Briefcase className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none">
                  KIGALI <span className="text-purple-700">LUGGAGE</span>
                </span>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[11px] font-bold text-slate-500 tracking-wider uppercase">
                    SOLUTION
                  </span>
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                    Downtown Kigali
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.page}
                id={`nav-link-${link.page}`}
                onClick={() => handleNavClick(link.page)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                  currentPage === link.page
                    ? 'text-purple-700 bg-purple-50'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                id="desktop-categories-dropdown-btn"
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                  categoriesOpen
                    ? 'text-purple-700 bg-purple-50'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-stone-100'
                }`}
              >
                Categories
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    categoriesOpen ? 'rotate-90' : ''
                  }`}
                />
              </button>

              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {CATEGORY_ITEMS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-800 transition-colors flex items-center justify-between"
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center relative w-48 xl:w-64"
            >
              <input
                type="text"
                placeholder="Search suitcases, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-stone-100 border border-stone-200 rounded-full focus:outline-none focus:border-purple-600 focus:bg-white text-slate-800 placeholder-slate-400 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Direct Call / WhatsApp for quick order */}
            <a
              id="header-call-btn"
              href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200"
              title="Call Kigali Luggage Solution"
            >
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>{BUSINESS_CONFIG.phoneDisplay}</span>
            </a>

            <a
              id="header-whatsapp-cta-btn"
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I want to order luggage.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Order</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-button"
              onClick={openCart}
              className="relative p-2.5 rounded-xl bg-slate-900 text-white hover:bg-purple-900 transition-colors shadow-sm flex items-center justify-center"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-white" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white"
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div className="lg:hidden pb-4 pt-1 animate-in fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                autoFocus
                placeholder="Search suitcases, carry-ons, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-stone-100 border border-stone-300 rounded-xl focus:outline-none focus:border-purple-600 focus:bg-white text-slate-900"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
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
        <div className="lg:hidden fixed inset-0 top-[115px] z-50 bg-slate-950/40 backdrop-blur-xs">
          <div className="bg-white w-full max-h-[80vh] overflow-y-auto border-b border-stone-200 p-6 shadow-2xl animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-4">
              {/* Navigation Links */}
              <div className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.page}
                    id={`mobile-nav-${link.page}`}
                    onClick={() => handleNavClick(link.page)}
                    className={`w-full text-left px-4 py-3 text-base font-semibold rounded-xl flex items-center justify-between transition-colors ${
                      currentPage === link.page
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-slate-800 hover:bg-stone-50'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>

              {/* Categories list in mobile */}
              <div className="border-t border-stone-100 pt-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-4 mb-2 block">
                  Product Categories
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_ITEMS.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategorySelect(cat)}
                      className="text-left px-3 py-2 text-xs font-medium text-slate-700 bg-stone-50 hover:bg-purple-50 hover:text-purple-700 rounded-lg border border-stone-200"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Free delivery reminder */}
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 flex items-center gap-3">
                <Truck className="w-5 h-5 text-purple-700 shrink-0" />
                <div className="text-xs text-purple-950">
                  <span className="font-bold block">{BUSINESS_CONFIG.deliveryPromise}</span>
                  <span>We deliver to your door anywhere in Kigali</span>
                </div>
              </div>

              {/* Quick direct buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-stone-100 text-slate-800 rounded-xl font-semibold text-sm border border-stone-300"
                >
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    'Hello Kigali Luggage Solution, I want to order luggage.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 text-white rounded-xl font-semibold text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
