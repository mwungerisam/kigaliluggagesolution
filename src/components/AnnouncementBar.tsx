import React from 'react';
import { Truck, MessageCircle, MapPin } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const AnnouncementBar: React.FC = () => {
  return (
    <div id="announcement-bar" className="bg-slate-900 text-slate-200 text-xs font-medium py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
        {/* Left: Free delivery statement */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center bg-purple-950 text-purple-300 px-2 py-0.5 rounded text-[11px] font-bold border border-purple-800 tracking-wide uppercase">
            Special
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-white">
            <Truck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
            <span>{BUSINESS_CONFIG.deliveryPromise}</span>
          </div>
          <span className="hidden md:inline text-slate-400">•</span>
          <span className="hidden md:inline text-slate-300">Fast, convenient delivery directly to your door</span>
        </div>

        {/* Right: Kigali location & WhatsApp direct contact */}
        <div className="flex items-center gap-4 text-slate-300">
          <span className="hidden lg:flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{BUSINESS_CONFIG.location}</span>
          </span>
          <span className="hidden lg:inline text-slate-600">|</span>
          <a
            href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Kigali Luggage Solution, I have an inquiry about your suitcases.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Order via WhatsApp: {BUSINESS_CONFIG.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
