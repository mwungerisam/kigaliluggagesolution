import React from 'react';
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
  ];

  return (
    <footer id="main-footer" className="bg-[#18181B] text-[#A1A1AA] pt-16 pb-24 md:pb-12 border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#27272A]">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-extrabold text-sm text-white uppercase tracking-[0.2em] block">
              Kigali Luggage Solution
            </span>

            <p className="text-xs text-[#A1A1AA] leading-relaxed max-w-sm">
              Retail destination in Kigali for quality suitcases, carry-ons, luggage sets, and travel gear. Complimentary doorstep delivery within Kigali.
            </p>

            <div className="text-xs text-[#D4D4D8] space-y-1 pt-2">
              <p>• Showroom: {BUSINESS_CONFIG.location}</p>
              <p>• Hours: {BUSINESS_CONFIG.openingHours}</p>
              <p>• Direct Telephone: {BUSINESS_CONFIG.phoneDisplay}</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Luggage Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Our Store
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Customer Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigateToCategory(cat)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Ordering */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Orders
            </h3>
            <div className="space-y-2 text-xs">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kigali Luggage Solution, I would like to place an order.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                WhatsApp Ordering
              </a>
              <a
                href={BUSINESS_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-white transition-colors"
              >
                Instagram Profile
              </a>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="block hover:text-white transition-colors"
              >
                Call {BUSINESS_CONFIG.phoneDisplay}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment notice */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>
            © {new Date().getFullYear()} {BUSINESS_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[11px]">
            <span>Free Kigali Delivery</span>
            <span>•</span>
            <span>Pay on Delivery (Cash / MoMo)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
