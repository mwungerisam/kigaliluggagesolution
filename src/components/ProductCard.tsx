import React, { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { formatRWF } from '../config/business';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { navigateToProduct } = useShop();

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

  const currentImage = product.images[activeImageIndex] || product.images[0];

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => navigateToProduct(product.id)}
      className="group flex flex-col bg-white border border-[#E4E4E7] hover:border-[#18181B] transition-colors duration-200 cursor-pointer rounded-none"
    >
      {/* Product Image Box */}
      <div className="relative aspect-square w-full bg-[#F4F4F5] overflow-hidden flex items-center justify-center p-6">
        <img
          src={currentImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800';
          }}
          className="w-full h-full object-contain object-center group-hover:scale-103 transition-transform duration-300"
          loading="lazy"
        />

        {/* Minimalist category indicator */}
        {product.category === 'Luggage Sets' && (
          <span className="absolute top-3 left-3 bg-[#990000] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-sm">
            3-Piece Set
          </span>
        )}

        {/* Quick Add on Hover (Desktop) */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm ${
              addedAnim
                ? 'bg-[#18181B] text-white'
                : 'bg-white text-[#18181B] hover:bg-[#18181B] hover:text-white'
            }`}
          >
            {addedAnim ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 stroke-[1.75]" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 bg-white">
        <div>
          <div className="flex items-center justify-between text-[11px] uppercase tracking-widest text-[#71717A] mb-1">
            <span>{product.category}</span>
            <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>

          <h3 className="font-semibold text-sm sm:text-base text-[#18181B] leading-snug group-hover:text-black transition-colors line-clamp-1">
            {product.name}
          </h3>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-bold text-[#18181B]">
              {formatRWF(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#A1A1AA] line-through">
                {formatRWF(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Color swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-[#F4F4F5]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-1.5">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  title={color.name}
                  onClick={() => handleColorSelect(color.name, color.imageIndex)}
                  className={`w-3.5 h-3.5 rounded-full border transition-transform ${
                    selectedColor === color.name
                      ? 'border-[#18181B] scale-125'
                      : 'border-[#D4D4D8] hover:scale-110'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
            <span className="text-[10px] text-[#A1A1AA] uppercase tracking-wider">
              {product.colors.length} {product.colors.length === 1 ? 'Color' : 'Colors'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
