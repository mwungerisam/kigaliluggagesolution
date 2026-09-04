import React, { useState } from 'react';
import {
  ShoppingBag,
  MessageCircle,
  Check,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { formatRWF, getProductWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailView: React.FC = () => {
  const { selectedProduct, navigateTo, navigateToCategory } = useShop();
  const { addToCart } = useCart();

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-[#18181B] uppercase">Product Not Found</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
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
      <nav className="flex items-center gap-2 text-xs text-[#71717A] overflow-x-auto whitespace-nowrap pb-2 border-b border-[#E4E4E7]">
        <button onClick={() => navigateTo('home')} className="hover:text-[#18181B] transition-colors">
          Home
        </button>
        <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
        <button onClick={() => navigateTo('shop')} className="hover:text-[#18181B] transition-colors">
          Catalog
        </button>
        <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
        <button
          onClick={() => navigateToCategory(selectedProduct.category)}
          className="hover:text-[#18181B] transition-colors"
        >
          {selectedProduct.category}
        </button>
        <ChevronRight className="w-3 h-3 text-[#A1A1AA]" />
        <span className="text-[#18181B] font-semibold truncate max-w-[200px]">{selectedProduct.name}</span>
      </nav>

      {/* Main Product Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square w-full bg-[#F4F4F5] border border-[#E4E4E7] p-8 flex items-center justify-center overflow-hidden">
            <img
              src={currentImage}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 border bg-[#F4F4F5] p-1.5 transition-colors shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-[#18181B]'
                      : 'border-[#E4E4E7] opacity-60 hover:opacity-100'
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

        {/* Right Column: Information, Selectors & Ordering */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center justify-between text-[11px] mb-2">
              <span className="font-bold uppercase tracking-[0.2em] text-[#71717A]">
                {selectedProduct.category}
              </span>
              <span className="font-mono text-[#71717A]">
                {selectedProduct.inStock ? 'In Stock (Kigali)' : 'Sold Out'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight uppercase">
              {selectedProduct.name}
            </h1>

            {/* Price in Rwandan Francs (RWF) */}
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                {formatRWF(selectedProduct.price)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-sm text-[#A1A1AA] line-through">
                  {formatRWF(selectedProduct.originalPrice)}
                </span>
              )}
              <span className="text-xs text-[#71717A]">
                • Kigali Delivery Included
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Color Selector */}
          {selectedProduct.colors && selectedProduct.colors.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-[#E4E4E7]">
              <div className="flex justify-between text-xs">
                <span className="text-[#71717A]">
                  Color: <strong className="text-[#18181B] font-semibold">{selectedColor}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
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
                    className={`px-3 py-1.5 text-xs border flex items-center gap-2 transition-colors cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-[#18181B] bg-[#18181B] text-white font-medium'
                        : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#18181B]'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-stone-300 shrink-0"
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
            <div className="space-y-2 pt-3 border-t border-[#E4E4E7]">
              <div className="flex justify-between text-xs">
                <span className="text-[#71717A]">
                  Size: <strong className="text-[#18181B] font-semibold">{selectedSize}</strong>
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1.5 text-xs border transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'border-[#18181B] bg-[#18181B] text-white font-medium'
                        : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#18181B]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 pt-3 border-t border-[#E4E4E7]">
            <span className="text-xs text-[#71717A]">Quantity:</span>
            <div className="flex items-center border border-[#E4E4E7] bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-[#18181B] hover:bg-[#F4F4F5] text-xs font-bold transition-colors"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="px-3 py-1 text-xs font-semibold text-[#18181B] min-w-[32px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-[#18181B] hover:bg-[#F4F4F5] text-xs font-bold transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <span className="text-xs text-[#71717A]">
              Total: <strong className="text-[#18181B]">{formatRWF(selectedProduct.price * quantity)}</strong>
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                id="product-add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`py-3.5 px-6 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  addedToast
                    ? 'bg-[#18181B] text-white'
                    : 'bg-[#18181B] hover:bg-black text-white'
                } disabled:bg-[#E4E4E7] disabled:text-[#A1A1AA]`}
              >
                {addedToast ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <button
                id="product-buy-now-btn"
                onClick={handleBuyNow}
                disabled={!selectedProduct.inStock}
                className="py-3.5 px-6 font-bold text-xs uppercase tracking-wider bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] hover:border-[#18181B] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>Checkout</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <a
              id="product-order-whatsapp-btn"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 font-bold text-xs uppercase tracking-wider bg-[#18181B] hover:bg-black text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Order via WhatsApp ({BUSINESS_CONFIG.phoneDisplay})</span>
            </a>
          </div>

          {/* Quick Notice */}
          <div className="p-4 bg-[#F4F4F5] border border-[#E4E4E7] text-xs text-[#52525B] space-y-1">
            <span className="font-semibold text-[#18181B] block uppercase tracking-wide text-[11px]">
              Kigali Delivery Guarantee
            </span>
            <p>
              Free doorstep delivery within Kigali city limits. Inspect on delivery and pay via Cash or Mobile Money.
            </p>
          </div>
        </div>
      </div>

      {/* DELIVERY EXPLANATION */}
      <section id="delivery-process-section" className="bg-white p-8 border border-[#E4E4E7] space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
            Service
          </span>
          <h3 className="text-lg font-bold text-[#18181B] uppercase tracking-wide">
            Delivery & Payment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <span className="font-mono text-[#71717A]">01</span>
            <h4 className="font-bold text-[#18181B] uppercase">Select Model</h4>
            <p className="text-[#71717A]">Choose color and size, then order online or via WhatsApp.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#71717A]">02</span>
            <h4 className="font-bold text-[#18181B] uppercase">Confirmation</h4>
            <p className="text-[#71717A]">Our Downtown Kigali store confirms delivery address immediately.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#71717A]">03</span>
            <h4 className="font-bold text-[#18181B] uppercase">Doorstep Dispatch</h4>
            <p className="text-[#71717A]">Delivered directly to your home or office at zero extra fee.</p>
          </div>
          <div className="space-y-1">
            <span className="font-mono text-[#71717A]">04</span>
            <h4 className="font-bold text-[#18181B] uppercase">Pay on Delivery</h4>
            <p className="text-[#71717A]">Inspect condition and pay with Cash or MTN Mobile Money.</p>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      {selectedProduct.specifications && selectedProduct.specifications.length > 0 && (
        <section id="product-specifications-section" className="bg-white p-8 border border-[#E4E4E7] space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
              Specifications
            </span>
            <h3 className="text-lg font-bold text-[#18181B] uppercase tracking-wide">
              Technical Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {selectedProduct.specifications.map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 border-b border-[#E4E4E7]"
              >
                <span className="text-[#71717A]">{spec.label}</span>
                <span className="font-medium text-[#18181B] text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7]">
            <h3 className="text-base font-bold text-[#18181B] uppercase tracking-wide">
              Related Luggage
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#71717A] hover:text-[#18181B] uppercase tracking-wider"
            >
              View Catalog
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
