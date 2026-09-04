import React from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRWF } from '../config/business';

export const AddedToCartToast: React.FC = () => {
  const { showAddedToast, dismissToast, lastAddedItem, openCart } = useCart();

  if (!showAddedToast || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 md:left-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl p-4 border border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-1.5 bg-emerald-500/20 text-emerald-400 rounded-full mt-0.5 shrink-0">
          <CheckCircle2 className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Added to Cart
            </span>
            <button
              onClick={dismissToast}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-1 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-lg bg-slate-800 p-1 shrink-0 overflow-hidden">
              <img
                src={lastAddedItem.product.images[0]}
                alt={lastAddedItem.product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {lastAddedItem.product.name}
              </p>
              <p className="text-[11px] text-purple-300">
                {formatRWF(lastAddedItem.product.price)} • {lastAddedItem.selectedColor}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              dismissToast();
              openCart();
            }}
            className="mt-2.5 w-full py-1.5 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>View Cart & Checkout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
