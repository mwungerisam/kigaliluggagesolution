import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';
import heroDisplay from '../assets/images/hero_luggage_display_1788522444129.jpg';
import luggageSetImg from '../assets/images/luggage_set_trio_1788522457562.jpg';
import travelDuffleImg from '../assets/images/travel_duffle_bag_1788522470845.jpg';
import carryOnImg from '../assets/images/carry_on_spinner_1788522512958.jpg';
import travelPillowImg from '../assets/images/travel_pillow_1788522526560.jpg';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-1',
    image: heroDisplay,
    caption: 'Showroom update! Fresh restock of our premium hard shell spinner suitcases in all sizes. Free delivery everywhere in Kigali.',
    likes: 184,
    comments: 24,
    tag: '#KigaliLuggage',
  },
  {
    id: 'post-2',
    image: carryOnImg,
    caption: 'The rose gold cabin spinner is officially a favorite. Fits perfectly in RwandAir overhead cabins with silent glide wheels.',
    likes: 246,
    comments: 31,
    tag: '#TravelRwanda',
  },
  {
    id: 'post-3',
    image: luggageSetImg,
    caption: 'Matching 3-piece navy blue sets ready for home delivery. All pieces nest together for compact home storage!',
    likes: 312,
    comments: 45,
    tag: '#LuggageSet',
  },
  {
    id: 'post-4',
    image: travelDuffleImg,
    caption: 'Weekend trip to Lake Kivu or Musanze? This waterproof duffle with bottom shoe compartment is your best companion.',
    likes: 142,
    comments: 18,
    tag: '#WeekendTrip',
  },
  {
    id: 'post-5',
    image: travelPillowImg,
    caption: 'Long flights ahead? Treat your neck to our ergonomic slow-rebound memory foam pillow. Super soft and breathable.',
    likes: 175,
    comments: 16,
    tag: '#TravelComfort',
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section id="instagram-section" className="py-16 bg-stone-100/70 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs tracking-wider uppercase mb-2">
              <Instagram className="w-4 h-4" />
              <span>As Seen on Instagram</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Follow Our Latest Products
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              See how our suitcases look in real life. We post daily customer deliveries, unboxings, and new arrivals from Downtown Kigali.
            </p>
          </div>

          <a
            id="instagram-follow-cta"
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 text-white rounded-xl font-bold text-xs shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {BUSINESS_CONFIG.instagramHandle}</span>
            <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
          </a>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BUSINESS_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/60 shadow-xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover Darkened Overlay */}
              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-wider text-purple-300">
                    {post.tag}
                  </span>
                  <Instagram className="w-4 h-4 text-white" />
                </div>

                <p className="text-[11px] text-slate-200 line-clamp-3 leading-snug">
                  {post.caption}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-300 pt-1 border-t border-white/20">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3 text-slate-300" />
                    {post.comments}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Local Verification Notice */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 bg-white p-3.5 rounded-xl border border-stone-200 max-w-2xl mx-auto text-center">
          <span className="font-semibold text-slate-900">
            Real photos from our Downtown Kigali store & customer dispatches.
          </span>
          <span className="text-stone-300">•</span>
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 font-bold underline"
          >
            Check our Instagram Reviews Highlight
          </a>
        </div>
      </div>
    </section>
  );
};
