import React from 'react';
import { MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const WhatsAppFloatingButton: React.FC = () => {
  const defaultMessage = `Hello Kigali Luggage Solution! I am browsing your catalog and would like to ask about available suitcases and Kigali delivery.`;
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <aside aria-label="WhatsApp Assistance" className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40">
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 bg-[#18181B] hover:bg-black text-white rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-[#27272A]"
        aria-label="Chat on WhatsApp"
        title="WhatsApp Order & Inquiries"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
      </a>
    </aside>
  );
};
