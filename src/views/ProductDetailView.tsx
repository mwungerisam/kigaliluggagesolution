import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  Check,
  Share2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { formatRWF, getProductWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, navigateTo, navigateToCategory, navigateToProduct } = useShop();
  const { addToCart } = useCart();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Product Not Found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity, selectedColor, selectedSize);
    navigateTo('checkout');
  };

  const whatsappUrl = getProductWhatsAppUrl({
    productName: selectedProduct.name,
    price: selectedProduct.price,
    quantity,
    color: selectedColor,
    size: selectedSize,
  });

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.featured)
  ).slice(0, 3);

  const currentImage = selectedProduct.images[activeImageIndex] || selectedProduct.images[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
        <button onClick={() => navigateTo('home')} className="hover:text-slate-900 transition-colors">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('shop')} className="hover:text-slate-900 transition-colors">
          Shop
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => navigateToCategory(selectedProduct.category)}
          className="hover:text-slate-900 transition-colors font-medium"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-bold truncate max-w-[200px]">{selectedProduct.name}</span>
      </nav>

      {/* Back button */}
      <button
        onClick={() => navigateTo('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Catalog</span>
      </button>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-square w-full rounded-3xl bg-stone-100 border border-stone-200 p-8 flex items-center justify-center overflow-hidden shadow-xs">
            <img
              src={currentImage}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain transition-all duration-300"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
              {selectedProduct.bestSeller && (
                <span className="bg-slate-900 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                  Best Seller
                </span>
              )}
              {selectedProduct.isNewArrival && (
                <span className="bg-purple-700 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  New Arrival
                </span>
              )}
            </div>

            <div className="absolute top-4 right-4">
              <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-lg shadow-xs">
                Free Delivery in Kigali
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl border-2 overflow-hidden bg-white p-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-sm scale-105'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${selectedProduct.name} view ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information, Selectors & Ordering (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-extrabold text-purple-700 uppercase tracking-wider">
                {selectedProduct.category}
              </span>
              <span className="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                {selectedProduct.inStock ? 'Available in Kigali' : 'Out of Stock'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {selectedProduct.name}
            </h1>

            {/* Price in Rwandan Francs (RWF) */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatRWF(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatRWF(selectedProduct.originalPrice)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Free Delivery Included
              </span>
            </div>
          </div>

          {/* Short description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Color Selector */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Available Colors: <strong className="text-purple-700">{selectedColor}</strong>
                </span>
                <span className="text-slate-400">({selectedProduct.colors.length} options)</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {selectedProduct.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(c.name);
                      if (typeof c.imageIndex === 'number' && selectedProduct.images[c.imageIndex]) {
                        setActiveImageIndex(c.imageIndex);
                      }
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-600/20 font-bold'
                        : 'border-stone-200 text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-stone-300 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-800">
                  Available Sizes: <strong className="text-purple-700">{selectedSize}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSize === s
                        ? 'border-purple-600 bg-purple-50 text-purple-900 ring-2 ring-purple-600/20 font-bold'
                        : 'border-stone-200 text-slate-700 hover:bg-stone-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-2 border-t border-stone-100">
            <span className="text-xs font-bold text-slate-800">Quantity:</span>
            <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-stone-50">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3.5 py-2 text-slate-700 hover:bg-stone-200 text-sm font-bold transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-4 py-2 text-xs font-bold text-slate-900 min-w-[36px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3.5 py-2 text-slate-700 hover:bg-stone-200 text-sm font-bold transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-slate-400">
              Total: <strong>{formatRWF(selectedProduct.price * quantity)}</strong>
            </span>
          </div>

          {/* Main Action Buttons */}
          <div className="space-y-3 pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Add to Cart */}
              <button
                id="product-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  addedToast
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-purple-900 text-white shadow-md hover:shadow-lg'
                } disabled:bg-stone-300 disabled:text-stone-500`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              {/* Buy Now / Direct Checkout */}
              <button
                id="product-buy-now-btn"
                onClick={handleBuyNow}
                disabled={!selectedProduct.inStock}
                className="py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-purple-700 hover:bg-purple-800 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-300"
              >
                <span>Buy Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* ORDER VIA WHATSAPP (Major conversion mechanism) */}
            <a
              id="product-order-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl font-extrabold text-xs uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>ORDER VIA WHATSAPP (Direct to Kigali Store)</span>
            </a>
          </div>

          {/* Clear Delivery Callout Box */}
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
            <div className="flex items-center gap-2 text-purple-900 font-bold text-xs">
              <Truck className="w-4 h-4 text-purple-700" />
              <span>FREE DELIVERY IN KIGALI</span>
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">
              Order now and receive your luggage at your home or workplace in Kigali. Pay upon inspection with cash or MTN/Airtel Mobile Money.
            </p>
          </div>
        </div>
      </div>

      {/* DELIVERY EXPLANATION SECTION */}
      <section id="delivery-process-section" className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-6">
        <div className="max-w-xl">
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
            Seamless Local Service
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            FREE DELIVERY IN KIGALI — How It Works
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            We make buying luggage in Kigali as convenient and worry-free as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Select & Order</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Choose your preferred suitcase model, size, and color on this website or tap Order via WhatsApp.
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Instant Confirmation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our Downtown Kigali team confirms your order and delivery location (Gasabo, Kicukiro, or Nyarugenge).
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Doorstep Delivery</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our driver delivers the luggage safely to your address at no additional delivery cost.
            </p>
          </div>

          <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-2">
            <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h4 className="font-bold text-slate-900 text-sm">Inspect & Pay</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Verify the quality, zippers, wheels, and condition on delivery, then pay with Cash or Mobile Money.
            </p>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS TABLE */}
      {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
        <section id="product-specifications-section" className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Technical Details
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Product Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedProduct.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
              >
                <span className="font-medium text-slate-500">{spec.label}</span>
                <span className="font-bold text-slate-900 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              You Might Also Like
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
