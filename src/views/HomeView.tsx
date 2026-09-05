import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import heroDisplay from '../assets/images/hero_luggage_display_1788522444129.jpg';

export const HomeView: React.FC = () => {
  const { navigateTo, navigateToCategory } = useShop();

  const signatureLuggage = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const luggageSets = PRODUCTS.filter((p) => p.category === 'Luggage Sets').slice(0, 3);

  const heroWhatsAppUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Kigali Luggage Solution! I am looking for quality luggage in Kigali.'
  )}`;

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      {/* 1. EDITORIAL HERO SECTION */}
      <section id="hero-section" className="border-b border-[#E4E4E7] bg-[#F4F4F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Typography & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#990000]">
                <span>Kigali, Rwanda</span>
                <span>•</span>
                <span>Complimentary Delivery</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#18181B] leading-[1.08] uppercase font-heading">
                Engineered for every journey.
              </h1>

              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed max-w-lg">
                Durable hard-shell suitcases, coordinated 3-piece sets, and airline-compliant carry-ons. Inspected and delivered directly to your doorstep in Kigali.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  id="hero-shop-luggage-btn"
                  onClick={() => navigateTo('shop')}
                  className="px-7 py-3.5 bg-[#990000] hover:bg-[#800000] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  id="hero-order-whatsapp-btn"
                  href={heroWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] hover:border-[#18181B] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>

              {/* Quiet Micro Details */}
              <div className="pt-6 border-t border-[#E4E4E7] grid grid-cols-3 gap-4 text-[11px] text-[#71717A]">
                <div>
                  <span className="block font-extrabold text-[#990000]">0 RWF</span>
                  <span>Kigali Delivery</span>
                </div>
                <div>
                  <span className="block font-bold text-[#18181B]">Physical</span>
                  <span>Store Showroom</span>
                </div>
                <div>
                  <span className="block font-bold text-[#18181B]">Pay on Arrival</span>
                  <span>Cash or MoMo</span>
                </div>
              </div>
            </div>

            {/* Right: Clean Editorial Photography Frame */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full bg-white border border-[#E4E4E7] overflow-hidden">
                <img
                  src={heroDisplay}
                  alt="Kigali Luggage Solution Collection"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED COLLECTIONS */}
      <section id="featured-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E4E4E7]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
              Categories
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] uppercase">
              Curated Collections
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-[#18181B] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>All Products</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => navigateToCategory(cat.category)}
              className="group text-left bg-white border border-[#E4E4E7] hover:border-[#18181B] transition-colors p-4 flex flex-col justify-between cursor-pointer"
            >
              <div className="aspect-square w-full bg-[#F4F4F5] p-3 overflow-hidden flex items-center justify-center mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-semibold text-xs sm:text-sm text-[#18181B] uppercase tracking-wide">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-[#71717A]">
                  {cat.itemCount} {cat.itemCount === 1 ? 'model' : 'models'}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. SIGNATURE LUGGAGE CATALOG */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E4E4E7]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
              Selection
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] uppercase">
              Featured Luggage
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-[#18181B] hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            <span>Full Catalog</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureLuggage.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. COMPLETE SETS SPOTLIGHT */}
      {luggageSets.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 pb-3 border-b border-[#E4E4E7]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
                Travel Ready
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] uppercase">
                Matching Luggage Sets
              </h2>
            </div>
            <button
              onClick={() => navigateToCategory('Luggage Sets')}
              className="text-xs font-semibold text-[#18181B] hover:underline uppercase tracking-wider flex items-center gap-1"
            >
              <span>View All Sets</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {luggageSets.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* 5. THE KIGALI LUGGAGE STANDARD (Clean 3-column architectural layout) */}
      <section id="craft-standard-section" className="border-y border-[#E4E4E7] bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mb-12">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block mb-1">
              Standard
            </span>
            <h2 className="text-2xl font-bold text-[#18181B] tracking-tight uppercase">
              The Kigali Luggage Standard
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-3">
              <span className="text-xs font-mono text-[#71717A]">01</span>
              <h3 className="font-bold text-base text-[#18181B] uppercase tracking-wide">
                Engineered Durability
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Reinforced polycarbonate & ABS hard-shells, heavy-duty telescoping handles, and Japanese 360° silent dual spinner wheels built for frequent transit.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#71717A]">02</span>
              <h3 className="font-bold text-base text-[#18181B] uppercase tracking-wide">
                Airline Compliant Dimensions
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Cabin and check-in sizes optimized for RwandAir, Ethiopian Airlines, Qatar Airways, and international luggage allowances.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono text-[#71717A]">03</span>
              <h3 className="font-bold text-base text-[#18181B] uppercase tracking-wide">
                Complimentary Kigali Delivery
              </h3>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Direct doorstep dispatch to Gasabo, Kicukiro, and Nyarugenge. Inspect your luggage on delivery and pay via Cash or MTN Mobile Money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DOWNTOWN SHOWROOM & DIRECT INQUIRY */}
      <section id="showroom-inquiry-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#18181B] text-white p-8 sm:p-14 border border-[#27272A] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A1A1AA] block">
              Showroom & Service
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase">
              Visit Kigali Showroom or Order Direct
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-xl">
              Inspect any suitcase model in person at our Kigali store, or request instant home/office delivery with one tap.
            </p>
            <div className="text-xs text-[#D4D4D8] space-y-1 pt-2">
              <p>• Location: {BUSINESS_CONFIG.location}</p>
              <p>• Hours: {BUSINESS_CONFIG.openingHours}</p>
              <p>• Direct Telephone: {BUSINESS_CONFIG.phoneDisplay}</p>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full py-3.5 bg-white hover:bg-[#F4F4F5] text-[#18181B] text-xs font-bold uppercase tracking-wider transition-colors text-center cursor-pointer"
            >
              Shop All Luggage
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to order luggage.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-bold uppercase tracking-wider transition-colors text-center border border-[#3F3F46]"
            >
              WhatsApp: {BUSINESS_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
