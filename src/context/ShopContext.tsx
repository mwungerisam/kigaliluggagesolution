import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';

export type PageView = 'home' | 'shop' | 'product-detail' | 'checkout' | 'about' | 'reviews' | 'contact';

interface ShopContextType {
  currentPage: PageView;
  currentView: PageView;
  selectedProductId: string | null;
  selectedProduct: Product | null;
  selectedCategory: ProductCategory;
  searchQuery: string;
  quickViewProduct: Product | null;
  navigateTo: (page: PageView) => void;
  navigateToProduct: (productId: string) => void;
  navigateToCategory: (category: ProductCategory) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: ProductCategory) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProductId]);

  const navigateTo = (page: PageView) => {
    setCurrentPage(page);
  };

  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const navigateToCategory = (category: ProductCategory) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const selectedProduct = selectedProductId
    ? PRODUCTS.find((p) => p.id === selectedProductId) || null
    : null;

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        currentView: currentPage,
        selectedProductId,
        selectedProduct,
        selectedCategory,
        searchQuery,
        quickViewProduct,
        navigateTo,
        navigateToProduct,
        navigateToCategory,
        setSearchQuery,
        setSelectedCategory,
        openQuickView,
        closeQuickView,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
