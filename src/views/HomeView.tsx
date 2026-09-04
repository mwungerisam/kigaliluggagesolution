import React from 'react';
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  Headphones,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  Star,
  MapPin,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';
import { InstagramSection } from '../components/InstagramSection';
import heroDisplay from '../assets/images/hero_luggage_display_1788522444129.jpg';

export const HomeView: React.FC = () => {
  const { navigateTo, navigateToCategory } = useShop();

  const featuredProducts = PRODUCTS.filter((p) => p.featured).slice(0, 6);
  const bestSellers = PRODUCTS.filter((p) => p.bestSeller || p.isNewArrival).slice(0, 4);

  const heroWhatsAppUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    'Hello Kigali Luggage Solution! I saw your luggage on your website and would like to place an order.'
  )}`;

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 3. HERO SECTION */}
      <section id="hero-section" className="relative overflow-hidden bg-slate-950 text-white">
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-purple-950/40 z-10" />

        {/* Background Hero Image with slight overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroDisplay}
            alt="Kigali Luggage Solution Showroom"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform motion-safe:animate-pulse duration-[10000ms]"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl space-y-6">
            {/* Location & Delivery Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-900/80 border border-purple-500/40 text-purple-200 text-xs font-semibold backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Free Delivery Everywhere in Kigali</span>
              <span className="text-purple-400">•</span>
              <span>Downtown Store</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              QUALITY LUGGAGE FOR EVERY JOURNEY
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal">
              Discover stylish, reliable luggage designed for your next journey — with convenient delivery across Kigali.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="hero-shop-luggage-btn"
                onClick={() => navigateTo('shop')}
                className="px-8 py-4 bg-white hover:bg-stone-100 text-slate-950 rounded-xl font-extrabold text-sm transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>SHOP LUGGAGE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                id="hero-order-whatsapp-btn"
                href={heroWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-sm transition-all shadow-xl hover:shadow-emerald-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>ORDER ON WHATSAPP</span>
              </a>
            </div>

            {/* Quick Metrics / Social Proof */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Downtown Kigali Store</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Same-Day Kigali Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Pay on Delivery (Cash / MoMo)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST / VALUE SECTION */}
      <section id="trust-value-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                Quality Products
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Tested hard-shell & soft-side luggage built with durable wheels and scratch-resistant materials.
              </p>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                Free Delivery in Kigali
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                We bring your luggage straight to your doorstep across Gasabo, Kicukiro, and Nyarugenge.
              </p>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                Easy Ordering
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Browse our catalog online and finalize seamlessly via our instant checkout or direct WhatsApp.
              </p>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm tracking-wide uppercase">
                Customer Support
              </h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Fast responses, honest advice on airline requirements, and dedicated after-sales care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED CATEGORIES */}
      <section id="featured-categories-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
              Explore Our Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group"
          >
            <span>View All Categories</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 5).map((cat) => (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              onClick={() => navigateToCategory(cat.category)}
              className="group text-left bg-white rounded-2xl border border-stone-200 hover:border-purple-300 hover:shadow-lg transition-all p-3 sm:p-4 flex flex-col justify-between overflow-hidden"
            >
              <div className="aspect-square w-full rounded-xl bg-stone-100 p-2 overflow-hidden flex items-center justify-center mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-purple-700 transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[11px] text-slate-500">
                  {cat.itemCount} {cat.itemCount === 1 ? 'model' : 'models'} available
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS */}
      <section id="featured-products-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
              Handpicked Essentials
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 group"
          >
            <span>See Full Store Catalog</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. WHY KIGALI LUGGAGE SOLUTION? */}
      <section id="why-kigali-luggage-solution" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-xl overflow-hidden relative">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              About Our Store
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Why Kigali Luggage Solution?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Based in Downtown Kigali, Kigali Luggage Solution was born to give Rwandan travelers and international guests access to high-grade, attractive luggage without prohibitive prices or complicated overseas imports.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Physical Downtown Store</strong>
                  <span className="text-slate-400">Conveniently located in Kigali city center for walk-in inspections.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Transparent Prices in RWF</strong>
                  <span className="text-slate-400">No hidden fees, no import taxes, free doorstep delivery included.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Airline Compliant Sizes</strong>
                  <span className="text-slate-400">Cabin-approved dimensions suited for RwandAir, Ethiopian, Qatar & more.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <strong className="text-white block font-bold">Instant WhatsApp Ordering</strong>
                  <span className="text-slate-400">Message our team directly for fast confirmations and custom requests.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => navigateTo('about')}
                className="px-6 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Learn More About Us
              </button>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <span>Call {BUSINESS_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FREE DELIVERY BANNER */}
      <section id="free-delivery-banner-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-purple-700/50 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold border border-white/20">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Prompt City-Wide Service</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              FREE DELIVERY IN KIGALI
            </h2>
            <p className="text-sm sm:text-base text-purple-100 leading-relaxed font-normal">
              Shop online and we'll bring your order to you. Whether you reside in Gasabo, Kicukiro, or Nyarugenge, we provide safe same-day or next-day delivery straight to your door.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              id="delivery-banner-shop-btn"
              onClick={() => navigateTo('shop')}
              className="px-8 py-4 bg-white hover:bg-stone-100 text-purple-950 rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg hover:shadow-xl text-center"
            >
              SHOP NOW
            </button>
            <a
              id="delivery-banner-whatsapp-btn"
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I want to arrange free delivery for a suitcase in Kigali.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>ORDER ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM SECTION */}
      <InstagramSection />

      {/* 10. CUSTOMER REVIEWS */}
      <section id="customer-reviews-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
            Verified Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Customer Reviews
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real experiences from travelers and residents across Kigali who trust Kigali Luggage Solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{review.author}</h4>
                  <span className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    {review.location}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigateTo('reviews')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 underline"
          >
            Read all customer reviews from Kigali
          </button>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section id="final-cta-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden border border-stone-800">
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-purple-400 uppercase tracking-widest">
              Downtown Kigali Showroom & Online Store
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              READY FOR YOUR NEXT JOURNEY?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Order your suitcase today with free delivery anywhere in Kigali. Need assistance? Our team is available on WhatsApp to guide your selection.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              id="final-shop-luggage-btn"
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-stone-100 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md uppercase tracking-wider"
            >
              SHOP LUGGAGE
            </button>
            <a
              id="final-chat-whatsapp-btn"
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I am ready to order luggage for my next journey.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>CHAT ON WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
