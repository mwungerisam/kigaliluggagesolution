import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useCart } from '../context/CartContext';
import { formatRWF, getProductWhatsAppUrl } from '../config/business';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-in fade-in">
      <div
        className="relative bg-white w-full max-w-3xl border border-[#E4E4E7] overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Images Column */}
        <div className="md:w-1/2 bg-[#F4F4F5] p-6 flex flex-col justify-between items-center border-b md:border-b-0 md:border-r border-[#E4E4E7]">
          <div className="w-full aspect-square flex items-center justify-center relative overflow-hidden bg-white p-4 border border-[#E4E4E7]">
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
                  className={`w-12 h-12 border overflow-hidden bg-white p-1 transition-all cursor-pointer ${
                    activeImage === idx
                      ? 'border-[#18181B]'
                      : 'border-[#E4E4E7] opacity-60 hover:opacity-100'
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
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block mb-1">
                {quickViewProduct.category}
              </span>

              <h2 className="text-lg font-bold text-[#18181B] tracking-tight uppercase">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-xl font-bold text-[#18181B]">
                  {formatRWF(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-xs text-[#71717A] line-through">
                    {formatRWF(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-[#71717A] leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Color selection */}
            {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
              <div>
                <div className="text-xs text-[#71717A] mb-2">
                  Color: <span className="font-semibold text-[#18181B]">{selectedColor}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
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
                      className={`px-3 py-1 text-xs border transition-colors cursor-pointer ${
                        selectedColor === c.name
                          ? 'border-[#18181B] bg-[#18181B] text-white font-medium'
                          : 'border-[#E4E4E7] text-[#18181B] hover:border-[#18181B]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selection */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div>
                <div className="text-xs text-[#71717A] mb-2">
                  Size: <span className="font-semibold text-[#18181B]">{selectedSize}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickViewProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 text-xs border transition-colors cursor-pointer ${
                        selectedSize === s
                          ? 'border-[#18181B] bg-[#18181B] text-white font-medium'
                          : 'border-[#E4E4E7] text-[#18181B] hover:border-[#18181B]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#71717A]">Quantity:</span>
              <div className="flex items-center border border-[#E4E4E7]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-2.5 py-1 text-[#18181B] hover:bg-[#F4F4F5] text-xs font-semibold cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 py-1 text-xs font-bold text-[#18181B] min-w-[28px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-2.5 py-1 text-[#18181B] hover:bg-[#F4F4F5] text-xs font-semibold cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-[#E4E4E7] flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAddToCart}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                  isAdded
                    ? 'bg-black text-white'
                    : 'bg-[#18181B] hover:bg-black text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added</span>
                  </>
                ) : (
                  <span>Add to Bag</span>
                )}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 text-xs font-bold uppercase tracking-wider bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] transition-colors flex items-center justify-center cursor-pointer"
              >
                <span>WhatsApp Order</span>
              </a>
            </div>

            <button
              onClick={handleViewFullDetails}
              className="text-xs text-[#71717A] hover:text-[#18181B] text-center py-1 transition-colors cursor-pointer uppercase tracking-wider text-[11px]"
            >
              View Full Product Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
