import React from 'react';
import {
  Briefcase,
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Truck,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const Footer: React.FC = () => {
  const { navigateTo, navigateToCategory } = useShop();

  const categories: ProductCategory[] = [
    'Suitcases',
    'Carry-On Luggage',
    'Large Suitcases',
    'Luggage Sets',
    'Travel Bags',
    'Travel Accessories',
    'Pillows',
  ];

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-900/60 border border-purple-700/50 flex items-center justify-center text-purple-300">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight">
                  KIGALI <span className="text-purple-400">LUGGAGE</span>
                </span>
                <span className="block text-[11px] font-bold text-slate-400 tracking-wider">
                  SOLUTION
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your trusted retail destination in Kigali for quality suitcases, carry-ons, luggage sets, and travel gear. Designed to keep your journeys smooth, secure, and stylish.
            </p>

            {/* Delivery statement highlight */}
            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-white block">{BUSINESS_CONFIG.deliveryPromise}</span>
                <span className="text-slate-400">Direct delivery to your home or office</span>
              </div>
            </div>

            {/* Direct Social / Messaging Badges */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-purple-900 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kigali Luggage Solution, I want to inquire about luggage.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-900 text-slate-300 hover:text-emerald-400 flex items-center justify-center transition-colors border border-slate-800"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Call Store"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors"
                >
                  Shop All Luggage
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors"
                >
                  About Our Business
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('reviews')}
                  className="hover:text-white transition-colors"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateToCategory(cat)}
                    className="hover:text-white transition-colors text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Downtown Store */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Visit & Contact
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="hover:text-white">
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300"
                >
                  WhatsApp Ordering
                </a>
              </div>
              <div className="flex items-start gap-2 text-[11px] pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <span>{BUSINESS_CONFIG.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Cash on Delivery</span>
            <span>•</span>
            <span>Mobile Money (MoMo)</span>
            <span>•</span>
            <span>WhatsApp Confirmation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
