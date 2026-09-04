import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  Truck,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { ProductCategory, Product } from '../types';
import { formatRWF, BUSINESS_CONFIG } from '../config/business';

type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export const ShopView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useShop();

  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);

  // Available unique sizes and colors across the catalog
  const allSizes = ['all', '20-inch (Cabin)', '24-inch (Medium Check-In)', '28-inch (Large Check-In)', 'Full 3-Piece Set (20", 24", 28")'];
  const allColors = ['all', 'Obsidian Black', 'Royal Navy', 'Champagne Gold', 'Rose Gold', 'Silver Slate', 'Charcoal Grey'];

  // Categories list
  const categoryTabs: ProductCategory[] = [
    'All',
    'Suitcases',
    'Carry-On Luggage',
    'Large Suitcases',
    'Luggage Sets',
    'Travel Bags',
    'Travel Accessories',
    'Pillows',
  ];

  // Filtering and Sorting logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Search query filter (matches name, description, category, tags, colors)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesTags = product.tags.some((t) => t.toLowerCase().includes(query));
        const matchesColors = product.colors.some((c) => c.name.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesTags && !matchesColors) {
          return false;
        }
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // Size filter
      if (selectedSize !== 'all') {
        const hasSize = product.sizes.some((s) =>
          s.toLowerCase().includes(selectedSize.toLowerCase().replace(/[^a-z0-9]/g, ''))
        );
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColor !== 'all') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      // In stock filter
      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      // default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, maxPrice, selectedSize, selectedColor, inStockOnly, sortOption]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSelectedSize('all');
    setSelectedColor('all');
    setInStockOnly(false);
    setMaxPrice(300000);
    setSortOption('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    searchQuery.trim() !== '' ||
    selectedSize !== 'all' ||
    selectedColor !== 'all' ||
    inStockOnly ||
    maxPrice < 300000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider mb-1">
            <span>Official Online Catalog</span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">{BUSINESS_CONFIG.deliveryPromise}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Shop Luggage & Suitcases
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-xl">
            Browse our durable hard-shell luggage, cabin trolleys, 3-piece sets, and travel accessories. Every order includes free delivery within Kigali.
          </p>
        </div>

        {/* Free Delivery Pill */}
        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200/80 flex items-center gap-3 shrink-0 self-start md:self-auto">
          <Truck className="w-5 h-5 text-purple-700" />
          <div className="text-xs">
            <span className="font-bold text-slate-900 block">Kigali Doorstep Delivery</span>
            <span className="text-purple-800">Same-day delivery across all sectors</span>
          </div>
        </div>
      </div>

      {/* Search and Quick Category Navigation Tabs */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search by keyword, e.g. 'suitcase', 'black suitcase', 'carry-on', 'large luggage'..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-10 py-3 text-sm bg-white border border-stone-300 rounded-2xl focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/10 shadow-xs text-slate-900 placeholder-slate-400"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills horizontal scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              <span>{cat}</span>
              {cat !== 'All' && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat ? 'bg-slate-800 text-purple-300' : 'bg-stone-100 text-slate-500'
                  }`}
                >
                  {PRODUCTS.filter((p) => p.category === cat).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar: Results Count + Filters Toggle + Sort Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-white border border-stone-200 rounded-xl shadow-xs text-slate-800"
          >
            <SlidersHorizontal className="w-4 h-4 text-purple-700" />
            <span>Filters {hasActiveFilters && '•'}</span>
          </button>

          <span className="text-xs font-semibold text-slate-500">
            Showing <strong className="text-slate-900">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          </span>
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500 hidden sm:inline">Sort by:</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-stone-200 rounded-xl pl-3 pr-8 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600 shadow-xs cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active filters chips if any */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-stone-100/80 rounded-xl text-xs">
          <span className="font-bold text-slate-500 text-[11px] uppercase tracking-wider">
            Active Filters:
          </span>
          {selectedCategory !== 'All' && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              Category: <strong>{selectedCategory}</strong>
              <button onClick={() => setSelectedCategory('All')} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              Search: <strong>"{searchQuery}"</strong>
              <button onClick={() => setSearchQuery('')} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedSize !== 'all' && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              Size: <strong>{selectedSize}</strong>
              <button onClick={() => setSelectedSize('all')} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedColor !== 'all' && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              Color: <strong>{selectedColor}</strong>
              <button onClick={() => setSelectedColor('all')} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {inStockOnly && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              <strong>In Stock Only</strong>
              <button onClick={() => setInStockOnly(false)} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {maxPrice < 300000 && (
            <span className="bg-white border border-stone-200 text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
              Under: <strong>{formatRWF(maxPrice)}</strong>
              <button onClick={() => setMaxPrice(300000)} className="text-stone-400 hover:text-slate-900">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="ml-auto text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Main Layout: Filter Sidebar (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Sidebar (Visible on desktop, collapsible on mobile) */}
        <aside
          className={`${
            showMobileFilters ? 'block' : 'hidden'
          } md:block md:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs h-fit`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-700" />
              Filter Products
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Price Range Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Max Price</span>
              <span className="text-purple-700">{formatRWF(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="300000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-purple-700 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>RWF 10,000</span>
              <span>RWF 300,000</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-slate-900 block">Luggage Size</span>
            <div className="space-y-1">
              {allSizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="size-filter"
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="accent-purple-700"
                  />
                  <span>{size === 'all' ? 'All Sizes' : size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-slate-900 block">Available Color</span>
            <div className="space-y-1">
              {allColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer py-1"
                >
                  <input
                    type="radio"
                    name="color-filter"
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="accent-purple-700"
                  />
                  <span>{color === 'all' ? 'All Colors' : color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-3 border-t border-stone-100">
            <label className="flex items-center justify-between text-xs font-bold text-slate-800 cursor-pointer">
              <span>In Stock in Kigali</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-purple-700 rounded cursor-pointer"
              />
            </label>
          </div>

          {/* Free Delivery Promise Reminder */}
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 text-xs text-purple-900 space-y-1">
            <strong className="block font-bold">Free Delivery Included</strong>
            <p className="text-[11px] text-purple-800 leading-snug">
              Every suitcase purchased is delivered free anywhere within Kigali city limits.
            </p>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-stone-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-slate-900">
                  No suitcases match your current search
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your keywords, resetting your filters, or asking our team directly on WhatsApp for stock availability.
                </p>
              </div>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Reset All Filters
                </button>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Kigali Luggage Solution, I was searching for "${searchQuery}" on your website. Do you have it in stock?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Inquire on WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
