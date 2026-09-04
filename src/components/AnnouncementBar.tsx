import React from 'react';
import { BUSINESS_CONFIG } from '../config/business';

export const AnnouncementBar: React.FC = () => {
  return (
    <div id="announcement-bar" className="bg-[#18181B] text-[#E4E4E7] text-[11px] font-medium tracking-wide py-2 px-4 border-b border-[#27272A]">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-center sm:text-left">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="font-semibold text-white tracking-wider uppercase text-[10px]">
            {BUSINESS_CONFIG.deliveryPromise}
          </span>
          <span className="text-[#71717A] hidden md:inline">•</span>
          <span className="text-[#A1A1AA] hidden md:inline">
            Complimentary doorstep delivery in Kigali • Downtown Showroom
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[#A1A1AA]">
          <span className="text-[11px]">Downtown Kigali</span>
          <span className="text-[#3F3F46]">|</span>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Kigali Luggage Solution, I would like to inquire about luggage.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-[#D4D4D8] transition-colors"
          >
            WhatsApp: {BUSINESS_CONFIG.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
};
