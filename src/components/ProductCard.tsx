import React, { useState } from 'react';
import { ShoppingBag, Eye, MessageCircle, Check, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatRWF, getProductWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { navigateToProduct, openQuickView } = useShop();

  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || 'Standard'
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleColorSelect = (colorName: string, index?: number) => {
    setSelectedColor(colorName);
    if (typeof index === 'number' && product.images[index]) {
      setActiveImageIndex(index);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor, product.sizes[0] || 'Standard');
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1500);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.id)}
      className="group bg-white rounded-2xl border border-stone-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer relative"
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.bestSeller && (
          <span className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="bg-purple-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            New
          </span>
        )}
      </div>

      <div className="absolute top-3 right-3 z-10">
        <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
          Free Kigali Delivery
        </span>
      </div>

      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-stone-100 overflow-hidden flex items-center justify-center p-4">
        <img
          src={currentImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View Floating Overlay button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <button
            type="button"
            onClick={handleQuickView}
            className="bg-white/95 text-slate-900 hover:bg-white text-xs font-semibold px-3 py-2 rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-1.5"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5 text-purple-700" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Status */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="font-semibold text-purple-700 uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <span className={`text-[11px] font-medium ${product.inStock ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.inStock ? 'In Stock (Kigali)' : 'Sold Out'}
            </span>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-purple-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 min-h-[32px] leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {formatRWF(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatRWF(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mt-3">
              <div className="text-[11px] font-medium text-slate-500 mb-1.5">
                Available in: <span className="text-slate-800 font-semibold">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    onClick={() => handleColorSelect(color.name, color.imageIndex)}
                    className={`w-5 h-5 rounded-full border transition-all flex items-center justify-center ${
                      selectedColor === color.name
                        ? 'ring-2 ring-purple-600 ring-offset-1 scale-110'
                        : 'border-stone-300 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {selectedColor === color.name && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          color.hex.toLowerCase() === '#ffffff' || color.hex.toLowerCase() === '#cbd5e1'
                            ? 'bg-slate-900'
                            : 'bg-white'
                        }`}
                      />
                    )}
                  </button>
                ))}
                <span className="text-[10px] text-slate-400 ml-1">
                  ({product.colors.length} colors)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: [View Product] [Add to Cart] and WhatsApp Quick */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              id={`view-btn-${product.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigateToProduct(product.id);
              }}
              className="w-full py-2 px-3 text-xs font-bold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors text-center"
            >
              View Product
            </button>

            <button
              id={`add-btn-${product.id}`}
              type="button"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-2 px-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                addedAnim
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-white hover:bg-purple-900 shadow-xs'
              } disabled:bg-stone-300 disabled:text-stone-500`}
            >
              {addedAnim ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Quick WhatsApp order action */}
          <a
            id={`whatsapp-order-card-${product.id}`}
            href={getProductWhatsAppUrl({
              productName: product.name,
              price: product.price,
              quantity: 1,
              color: selectedColor,
              size: product.sizes[0],
            })}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="w-full py-1.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Order via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
