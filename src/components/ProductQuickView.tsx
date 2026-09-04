import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, MessageCircle, Truck, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { formatRWF, getProductWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

export const ProductQuickView: React.FC = () => {
  const { quickViewProduct, closeQuickView, navigateToProduct } = useShop();
  const { addToCart } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setActiveImage(0);
      setSelectedColor(quickViewProduct.colors[0]?.name || 'Standard');
      setSelectedSize(quickViewProduct.sizes[0] || 'Standard');
      setQuantity(1);
      setIsAdded(false);
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigateToProduct(quickViewProduct.id);
  };

  const whatsappUrl = getProductWhatsAppUrl({
    productName: quickViewProduct.name,
    price: quickViewProduct.price,
    quantity,
    color: selectedColor,
    size: selectedSize,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column */}
        <div className="md:w-1/2 bg-stone-100 p-6 flex flex-col justify-between items-center">
          <div className="w-full aspect-square flex items-center justify-center relative overflow-hidden rounded-2xl bg-white/80 p-4">
            <img
              src={quickViewProduct.images[activeImage] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto max-w-full pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-white p-1 transition-all ${
                    activeImage === idx
                      ? 'border-purple-600 shadow-sm scale-105'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${quickViewProduct.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-purple-700 uppercase tracking-wider">
                {quickViewProduct.category}
              </span>
              <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                In Stock • Kigali
              </span>
            </div>

            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {quickViewProduct.name}
            </h2>

            {/* Price */}
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {formatRWF(quickViewProduct.price)}
              </span>
              {quickViewProduct.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatRWF(quickViewProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Free Delivery Callout */}
            <div className="mt-3 p-2.5 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-purple-700 shrink-0" />
              <div className="text-xs text-purple-950">
                <span className="font-bold">{BUSINESS_CONFIG.deliveryPromise}</span>
                <span className="block text-[11px] text-purple-800">
                  Order now and get it delivered directly to your doorstep in Kigali.
                </span>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-600 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Color selection */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Select Color: <span className="text-purple-700">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => {
                        setSelectedColor(c.name);
                        if (typeof c.imageIndex === 'number' && quickViewProduct.images[c.imageIndex]) {
                          setActiveImage(c.imageIndex);
                        }
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                        selectedColor === c.name
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                          : 'border-stone-200 text-slate-700 hover:bg-stone-50'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-stone-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="mt-4">
                <div className="text-xs font-bold text-slate-700 mb-2">
                  Select Size: <span className="text-purple-700">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        selectedSize === s
                          ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                          : 'border-stone-200 text-slate-700 hover:bg-stone-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-bold text-slate-700">Quantity:</span>
              <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-slate-700 hover:bg-stone-200 text-sm font-bold"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-slate-900 min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-slate-700 hover:bg-stone-200 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col gap-2.5">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 hover:bg-purple-900 text-white shadow-md'
                }`}
              >
                {isAdded ? (
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

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="text-xs font-semibold text-purple-700 hover:text-purple-800 flex items-center justify-center gap-1 py-1 transition-colors"
            >
              <span>View full product specifications & photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
