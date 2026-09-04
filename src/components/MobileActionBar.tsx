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
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E4E7] px-3 py-2 flex items-center gap-2"
    >
      <a
        id="mobile-action-call"
        href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
        className="flex-1 py-2 px-2 bg-white text-[#18181B] border border-[#E4E4E7] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>Call</span>
      </a>

      <a
        id="mobile-action-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.2] py-2 px-2 bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <button
        id="mobile-action-cart"
        onClick={openCart}
        className="relative flex-1 py-2 px-2 bg-white text-[#18181B] border border-[#E4E4E7] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Bag</span>
        {cartCount > 0 && (
          <span className="bg-[#18181B] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
            {cartCount}
          </span>
        )}
      </button>
    </div>
  );
};
