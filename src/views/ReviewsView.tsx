import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { BUSINESS_CONFIG } from '../config/business';
import { useShop } from '../context/ShopContext';

export const ReviewsView: React.FC = () => {
  const { navigateTo } = useShop();
  const [selectedRating, setSelectedRating] = useState<number | 'all'>('all');

  const averageRating = 4.9;
  const filteredReviews =
    selectedRating === 'all'
      ? CUSTOMER_REVIEWS
      : CUSTOMER_REVIEWS.filter((r) => r.rating === selectedRating);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
          Client Feedback
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight uppercase mt-1">
          Reviews & Experiences
        </h1>
        <p className="text-xs text-[#71717A] mt-1">
          Verified customer feedback from Kigali residents and travelers.
        </p>
      </div>

      {/* Review Summary */}
      <div className="bg-white p-6 sm:p-8 border border-[#E4E4E7] grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#18181B] tracking-tight">
              {averageRating}
            </span>
            <span className="text-xs text-[#71717A]">/ 5.0 Rating</span>
          </div>
          <div className="flex items-center gap-1 text-[#18181B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-[11px] text-[#71717A]">
            Based on customer deliveries and Instagram client tags.
          </p>
        </div>

        <div className="space-y-1 text-xs text-[#71717A]">
          <div className="flex items-center justify-between">
            <span>5 Stars</span>
            <span className="font-semibold text-[#18181B]">90%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>4 Stars</span>
            <span className="font-semibold text-[#18181B]">10%</span>
          </div>
          <div className="flex items-center justify-between">
            <span>3 Stars</span>
            <span>0%</span>
          </div>
        </div>

        <div className="text-left md:text-right">
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-bold uppercase tracking-wider text-[#18181B] hover:underline"
          >
            Tag @{BUSINESS_CONFIG.instagramHandle} →
          </a>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 border border-[#E4E4E7] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-0.5 text-[#18181B]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-[#71717A]">{review.date}</span>
              </div>

              <p className="text-xs text-[#52525B] leading-relaxed">
                "{review.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#F4F4F5] space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-[#18181B]">{review.author}</h4>
                <span className="text-[10px] text-[#71717A] uppercase tracking-wider">
                  {review.location}
                </span>
              </div>

              {review.productPurchased && (
                <div className="text-[11px] text-[#71717A]">
                  Item: <span className="text-[#18181B] font-medium">{review.productPurchased}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-8 border border-[#E4E4E7] text-center space-y-3">
        <h3 className="text-base font-bold text-[#18181B] uppercase tracking-wider">
          Ready to order your luggage?
        </h3>
        <p className="text-xs text-[#71717A] max-w-md mx-auto">
          Same-day free doorstep delivery across Kigali with cash or MoMo payment on inspection.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateTo('shop')}
            className="px-6 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    </div>
  );
};
