import React, { useState } from 'react';
import { MessageCircle, X, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const defaultMessage = `Hello Kigali Luggage Solution! I'm interested in your suitcases. Please let me know what models are in stock with free delivery in Kigali.`;
  const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    defaultMessage
  )}`;

  return (
    <aside aria-label="WhatsApp Support Assistance" className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end">
      {/* Tooltip bubble on hover / initial prompt */}
      {showTooltip && (
        <div className="mb-3 max-w-xs bg-white text-slate-800 rounded-2xl shadow-xl border border-stone-200 p-3.5 text-xs animate-in fade-in slide-in-from-bottom-2 relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-stone-400 hover:text-stone-700"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-slate-900 text-xs">Kigali Luggage Team Online</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Need help choosing the right suitcase size or want free delivery in Kigali? Chat with us directly!
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-bold text-[11px]"
          >
            <span>Open WhatsApp Chat</span>
            <Sparkles className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        id="floating-whatsapp-btn"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg hover:shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
        aria-label="Chat with Kigali Luggage Solution on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white"></span>
        </span>
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </aside>
  );
};
