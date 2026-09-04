import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Instagram,
  ThumbsUp,
  Filter,
} from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';

export const ReviewsView: React.FC = () => {
  const { navigateTo } = useShop();
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const averageRating = 4.9;
  const totalReviews = CUSTOMER_REVIEWS.length;

  const filteredReviews =
    selectedRating === 'all'
      ? CUSTOMER_REVIEWS
      : CUSTOMER_REVIEWS.filter((r) => r.rating === selectedRating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
          Trusted by Kigali Residents & Travelers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Customer Reviews & Experiences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Read real feedback from customers who have purchased suitcases, carry-ons, and luggage sets from Kigali Luggage Solution.
        </p>
      </div>

      {/* Review Summary Scorecard */}
      <div className="bg-white p-8 rounded-3xl border border-stone-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-5xl font-black text-slate-900 tracking-tight">
              {averageRating}
            </span>
            <span className="text-sm font-bold text-slate-400">/ 5.0</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-amber-400" />
            ))}
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Based on verified customer orders and Instagram reviews
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-1.5 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-12 text-slate-500">5 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div className="w-[90%] h-full bg-amber-400 rounded-full" />
            </div>
            <span className="font-bold text-slate-800">90%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-12 text-slate-500">4 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div className="w-[10%] h-full bg-amber-400 rounded-full" />
            </div>
            <span className="font-bold text-slate-800">10%</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-12">3 Stars</span>
            <div className="flex-1 h-2 rounded-full bg-stone-100 overflow-hidden">
              <div className="w-[0%] h-full bg-amber-400 rounded-full" />
            </div>
            <span>0%</span>
          </div>
        </div>

        {/* Direct CTA */}
        <div className="text-center md:text-right space-y-2">
          <span className="text-xs text-slate-500 block">Want to share your experience?</span>
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-xl text-xs font-bold transition-colors border border-purple-200"
          >
            <Instagram className="w-4 h-4" />
            <span>Tag us on Instagram</span>
          </a>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] text-slate-400">{review.date}</span>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{review.author}</h4>
                  <span className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-purple-600" />
                    {review.location}
                  </span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Order
                </span>
              </div>

              {review.productPurchased && (
                <div className="text-[11px] text-purple-800 bg-purple-50 px-2.5 py-1 rounded-lg">
                  Purchased: <strong>{review.productPurchased}</strong>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Callout */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 border border-stone-800">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
          Experience the Difference with Kigali Luggage Solution
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Get your suitcase delivered free anywhere in Kigali and inspect it before payment.
        </p>
        <div className="pt-2 flex justify-center">
          <button
            onClick={() => navigateTo('shop')}
            className="px-8 py-3.5 bg-white text-slate-950 hover:bg-stone-100 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-colors shadow-md"
          >
            Shop Kigali Luggage Now
          </button>
        </div>
      </div>
    </div>
  );
};
