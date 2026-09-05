import React from 'react';
import { X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRWF } from '../config/business';

export const AddedToCartToast: React.FC = () => {
  const { showAddedToast, dismissToast, lastAddedItem, openCart } = useCart();

  if (!showAddedToast || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-50 max-w-sm w-full bg-[#18181B] text-white p-4 border border-[#27272A] shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA]">
          Added to Bag
        </span>
        <button
          onClick={dismissToast}
          className="text-[#A1A1AA] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#27272A] p-1 shrink-0">
          <img
            src={lastAddedItem.product.images[0]}
            alt={lastAddedItem.product.name}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800';
            }}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-white uppercase truncate">
            {lastAddedItem.product.name}
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            {formatRWF(lastAddedItem.product.price)} • {lastAddedItem.selectedColor}
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          dismissToast();
          openCart();
        }}
        className="mt-3 w-full py-2 px-3 bg-white hover:bg-[#F4F4F5] text-[#18181B] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center"
      >
        View Bag & Checkout
      </button>
    </div>
  );
};
