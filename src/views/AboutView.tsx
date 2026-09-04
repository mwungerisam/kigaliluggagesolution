import React from 'react';
import {
  MessageCircle,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';
import heroDisplay from '../assets/images/hero_luggage_display_1788522444129.jpg';

export const AboutView: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
            Downtown Kigali, Rwanda
          </span>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#18181B] tracking-tight uppercase leading-tight">
            Quality Luggage for Modern Travel
          </h1>

          <p className="text-sm text-[#52525B] leading-relaxed">
            Welcome to <strong className="text-[#18181B]">Kigali Luggage Solution</strong>. We are a Kigali-based retail business specializing in high-grade suitcases, carry-ons, luggage sets, and travel gear.
          </p>

          <p className="text-xs sm:text-sm text-[#71717A] leading-relaxed">
            From our retail presence in Downtown Kigali and our active customer network, our focus is providing dependable, durable travel solutions in Rwanda. Every suitcase in our catalog is engineered to withstand transit while maintaining effortless maneuverability—accompanied by complimentary delivery across Kigali.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Catalog
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to learn more about your luggage collection.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-[4/3] border border-[#E4E4E7] bg-[#F4F4F5] overflow-hidden">
            <img
              src={heroDisplay}
              alt="Kigali Luggage Solution Showroom"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#E4E4E7]">
        <div className="bg-white p-6 border border-[#E4E4E7] space-y-2">
          <span className="font-mono text-xs text-[#71717A]">01</span>
          <h3 className="font-bold text-sm text-[#18181B] uppercase">Durable Construction</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Curated suitcases crafted from lightweight impact-resistant composites, reinforced corners, and silent 360-degree spinner wheels.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E4E4E7] space-y-2">
          <span className="font-mono text-xs text-[#71717A]">02</span>
          <h3 className="font-bold text-sm text-[#18181B] uppercase">Kigali Doorstep Delivery</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Free delivery across Gasabo, Kicukiro, and Nyarugenge. Inspect your luggage in person before completing payment.
          </p>
        </div>

        <div className="bg-white p-6 border border-[#E4E4E7] space-y-2">
          <span className="font-mono text-xs text-[#71717A]">03</span>
          <h3 className="font-bold text-sm text-[#18181B] uppercase">Direct Customer Service</h3>
          <p className="text-xs text-[#71717A] leading-relaxed">
            Direct communication with our Kigali team for dimension advice, color selections, and fast order dispatch.
          </p>
        </div>
      </div>

      {/* Store Location & Visiting Info */}
      <div className="bg-white p-8 sm:p-10 border border-[#E4E4E7] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
              Storefront
            </span>
            <h2 className="text-xl font-bold text-[#18181B] uppercase tracking-tight">
              Downtown Kigali Showroom
            </h2>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Visit our Downtown Kigali store to inspect materials, handle sizing, and test wheels in person during regular business hours.
            </p>

            <div className="space-y-1.5 text-xs text-[#52525B] pt-2">
              <p>• <strong>Location:</strong> {BUSINESS_CONFIG.location}</p>
              <p>• <strong>Telephone:</strong> {BUSINESS_CONFIG.phoneDisplay}</p>
              <p>• <strong>Hours:</strong> {BUSINESS_CONFIG.openingHours}</p>
            </div>
          </div>

          <div className="bg-[#F4F4F5] p-6 border border-[#E4E4E7] space-y-3">
            <h3 className="font-bold text-xs text-[#18181B] uppercase tracking-wider">
              Direct Remote Orders
            </h3>
            <p className="text-xs text-[#71717A] leading-relaxed">
              Need luggage delivered immediately? Message our team on WhatsApp for real-time stock photos and same-day dispatch.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to order a suitcase for delivery in Kigali.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
