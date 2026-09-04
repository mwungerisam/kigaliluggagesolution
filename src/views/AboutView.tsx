import React from 'react';
import {
  MapPin,
  Truck,
  ShieldCheck,
  Award,
  Phone,
  MessageCircle,
  Instagram,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';
import heroDisplay from '../assets/images/hero_luggage_display_1788522444129.jpg';
import luggageSetImg from '../assets/images/luggage_set_trio_1788522457562.jpg';

export const AboutView: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      {/* Hero Intro */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200">
            <MapPin className="w-3.5 h-3.5" />
            <span>Downtown Kigali, Rwanda</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Quality Luggage Designed for Every Journey
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Welcome to <strong className="text-slate-900">Kigali Luggage Solution</strong>. We are a Kigali-based retail business specializing in high-grade suitcases, carry-ons, luggage sets, and travel accessories.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            From our retail presence in Downtown Kigali and our active Instagram community, our mission is to eliminate the stress of finding dependable, stylish travel bags in Rwanda. We believe every traveler deserves luggage that glides smoothly, protects valuables securely, and endures airport handling—all delivered freely across Kigali.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md"
            >
              Explore Our Collection
            </button>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to learn more about your store.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
            <img
              src={heroDisplay}
              alt="Kigali Luggage Solution Showroom"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-5 rounded-2xl shadow-xl border border-slate-800 max-w-xs hidden sm:block">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold mb-1">
              <Truck className="w-4 h-4" />
              <span>FREE DELIVERY IN KIGALI</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Convenient same-day delivery direct to your home or office.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Proven Durability</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We curate suitcases built from impact-resistant polycarbonate ABS composites, reinforced corner caps, and silent 360-degree dual spinner wheels.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Kigali-Wide Free Delivery</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No unexpected transport fees. We bring your selected suitcases to your doorstep in Gasabo, Kicukiro, or Nyarugenge with payment on delivery.
          </p>
        </div>

        <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">Direct Customer Care</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Personal service from Kigali locals who understand airline dimensions, weight allowances, and international travel requirements.
          </p>
        </div>
      </div>

      {/* Store Location & Visiting Info */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              Visit Our Store
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Located in Downtown Kigali
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Prefer to see the colors, test the handles, and spin the wheels in person? Visit our Downtown Kigali retail location during our regular business hours or give us a quick call.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300 pt-2">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{BUSINESS_CONFIG.location}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Call: {BUSINESS_CONFIG.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                <span>{BUSINESS_CONFIG.openingHours}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/60 space-y-4">
            <h3 className="font-bold text-sm text-white">Can't Visit in Person?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Order directly through our website or send a WhatsApp message. We send clear photos, video walkthroughs, and dispatch directly to your doorstep.
            </p>
            <a
              href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Kigali Luggage Solution, I would like to order a suitcase for delivery in Kigali.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct Order</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
