import React from 'react';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BUSINESS_CONFIG } from '../config/business';

export const MobileActionBar: React.FC = () => {
  const { cartCount, openCart } = useCart();

  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Kigali Luggage Solution, I would like to order luggage.'
  )}`;

  return (
    <div
      id="mobile-sticky-action-bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 shadow-2xl flex items-center gap-2"
    >
      {/* Call Button */}
      <a
        id="mobile-action-call"
        href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
        className="flex-1 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-300 transition-colors"
      >
        <Phone className="w-4 h-4 text-purple-700" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        id="mobile-action-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.4] py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>WhatsApp</span>
      </a>

      {/* Cart Button with Count Badge */}
      <button
        id="mobile-action-cart"
        onClick={openCart}
        className="relative flex-1 py-2.5 px-3 bg-slate-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
      >
        <ShoppingBag className="w-4 h-4" />
        <span>Cart</span>
        {cartCount > 0 && (
          <span className="bg-purple-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full border border-white">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
