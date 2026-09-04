import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';
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

  const allSizes = ['all', '20-inch (Cabin)', '24-inch (Medium Check-In)', '28-inch (Large Check-In)', 'Full 3-Piece Set (20", 24", 28")'];
  const allColors = ['all', 'Obsidian Black', 'Royal Navy', 'Champagne Gold', 'Rose Gold', 'Silver Slate', 'Charcoal Grey'];

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

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

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

      if (product.price > maxPrice) {
        return false;
      }

      if (selectedSize !== 'all') {
        const hasSize = product.sizes.some((s) =>
          s.toLowerCase().includes(selectedSize.toLowerCase().replace(/[^a-z0-9]/g, ''))
        );
        if (!hasSize) return false;
      }

      if (selectedColor !== 'all') {
        const hasColor = product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        );
        if (!hasColor) return false;
      }

      if (inStockOnly && !product.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E4E4E7]">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] mb-1">
            <span>Kigali Catalog</span>
            <span className="mx-2">•</span>
            <span>Free Kigali Delivery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B] uppercase">
            Luggage & Travel Equipment
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#71717A] max-w-xl">
            Inspected hard-shell cases, expandable cabin spinners, and coordinated multi-piece sets.
          </p>
        </div>

        <div className="text-xs text-[#71717A] md:text-right">
          <span className="font-semibold text-[#18181B]">Showing {filteredProducts.length} items</span>
        </div>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-4">
        {/* Search bar */}
        <div className="relative max-w-xl">
          <input
            type="text"
            placeholder="Search luggage by model, size, or color..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B] text-[#18181B] placeholder-[#A1A1AA] transition-colors"
          />
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-[#A1A1AA] hover:text-[#18181B]"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Category Pills horizontal scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-b border-[#E4E4E7]">
          {categoryTabs.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-[1px] whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'border-[#18181B] text-[#18181B]'
                  : 'border-transparent text-[#71717A] hover:text-[#18181B]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold bg-white border border-[#E4E4E7] text-[#18181B]"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filter</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#71717A] hover:text-[#18181B] flex items-center gap-1 underline"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#71717A] hidden sm:inline">Sort:</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="appearance-none bg-white border border-[#E4E4E7] pl-3 pr-8 py-1.5 text-xs font-semibold text-[#18181B] focus:outline-none focus:border-[#18181B] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <ArrowUpDown className="w-3 h-3 text-[#71717A] absolute right-2.5 top-2.5 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main Layout: Filter Sidebar (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filter Sidebar */}
        <aside
          className={`${
            showMobileFilters ? 'block' : 'hidden'
          } md:block md:col-span-1 space-y-6 bg-white p-5 border border-[#E4E4E7] h-fit text-xs`}
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#E4E4E7]">
            <h3 className="font-bold uppercase tracking-wider text-[#18181B]">
              Refine
            </h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] text-[#71717A] hover:text-[#18181B] underline"
              >
                Clear
              </button>
            )}
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex justify-between font-semibold text-[#18181B]">
              <span>Max Price</span>
              <span>{formatRWF(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="300000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#18181B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#71717A]">
              <span>10,000 RWF</span>
              <span>300,000 RWF</span>
            </div>
          </div>

          {/* Size Filter */}
          <div className="space-y-2 pt-3 border-t border-[#E4E4E7]">
            <span className="font-bold uppercase tracking-wider text-[#18181B] block">Size</span>
            <div className="space-y-1">
              {allSizes.map((size) => (
                <label
                  key={size}
                  className="flex items-center gap-2 text-[#71717A] hover:text-[#18181B] cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="size-filter"
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="accent-[#18181B]"
                  />
                  <span>{size === 'all' ? 'All Sizes' : size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color Filter */}
          <div className="space-y-2 pt-3 border-t border-[#E4E4E7]">
            <span className="font-bold uppercase tracking-wider text-[#18181B] block">Color</span>
            <div className="space-y-1">
              {allColors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 text-[#71717A] hover:text-[#18181B] cursor-pointer py-0.5"
                >
                  <input
                    type="radio"
                    name="color-filter"
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="accent-[#18181B]"
                  />
                  <span>{color === 'all' ? 'All Colors' : color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-3 border-t border-[#E4E4E7]">
            <label className="flex items-center justify-between font-semibold text-[#18181B] cursor-pointer">
              <span>In Stock Only</span>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#18181B] cursor-pointer"
              />
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <main className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-[#E4E4E7] p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-[#F4F4F5] text-[#71717A] flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-[#18181B] uppercase">
                  No products found
                </h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                  Try adjusting your search criteria or contact our Kigali team directly on WhatsApp.
                </p>
              </div>
              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={resetFilters}
                  className="px-5 py-2.5 bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    `Hello Kigali Luggage Solution, I was searching for "${searchQuery}" on your website. Do you have it in stock?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-white border border-[#E4E4E7] text-[#18181B] text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Ask on WhatsApp
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
