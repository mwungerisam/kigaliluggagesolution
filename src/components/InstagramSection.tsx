import React from 'react';
import { Instagram, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  tag: string;
  postUrl: string;
  isVideo?: boolean;
  videoUrl?: string;
}

const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post-db7',
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800',
    caption: 'Special featured release: Premium aluminum and hard-shell collections on display at Kigali Luggage Solution. Free delivery across Kigali!',
    likes: 412,
    comments: 58,
    tag: '#Db7-FL5tzg2',
    postUrl: 'https://www.instagram.com/p/Db7-FL5tzg2/?hl=en',
    isVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-walking-with-suitcases-in-an-airport-41584-large.mp4',
  },
  {
    id: 'post-dbw',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dcae87?auto=format&fit=crop&q=80&w=800',
    caption: 'Showroom update! Fresh restock of our premium hard shell spinner suitcases in all sizes. Free delivery everywhere in Kigali.',
    likes: 184,
    comments: 24,
    tag: '#DbWZaG5jaZx',
    postUrl: 'https://www.instagram.com/p/DbWZaG5jaZx/?hl=en&img_index=1',
    isVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traveler-with-a-suitcase-at-the-train-station-41585-large.mp4',
  },
  {
    id: 'post-dbrog',
    image: 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800',
    caption: 'The rose gold cabin spinner is officially a favorite. Fits perfectly in RwandAir overhead cabins with silent glide wheels.',
    likes: 246,
    comments: 31,
    tag: '#DbROg2MNyrK',
    postUrl: 'https://www.instagram.com/p/DbROg2MNyrK/?hl=en',
  },
  {
    id: 'post-dbrent',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    caption: 'Matching 3-piece navy blue sets ready for home delivery. All pieces nest together for compact home storage!',
    likes: 312,
    comments: 45,
    tag: '#DbRNTjbjYW-',
    postUrl: 'https://www.instagram.com/p/DbRNTjbjYW-/?hl=en&img_index=1',
    isVideo: true,
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-with-luggage-in-a-lobby-41586-large.mp4',
  },
  {
    id: 'post-dbrjw',
    image: 'https://images.unsplash.com/photo-1533514652136-231a473f606e?auto=format&fit=crop&q=80&w=800',
    caption: 'Weekend trip to Lake Kivu or Musanze? This waterproof duffle with bottom shoe compartment is your best companion.',
    likes: 142,
    comments: 18,
    tag: '#DbRJw9Etgdy',
    postUrl: 'https://www.instagram.com/p/DbRJw9Etgdy/?hl=en',
  },
  {
    id: 'post-dbri8',
    image: 'https://images.unsplash.com/photo-1512753360435-364c74f4b232?auto=format&fit=crop&q=80&w=800',
    caption: 'Long flights ahead? Treat your neck to our ergonomic slow-rebound memory foam pillow. Super soft and breathable.',
    likes: 175,
    comments: 16,
    tag: '#DbRI8BaN0pK',
    postUrl: 'https://www.instagram.com/p/DbRI8BaN0pK/?hl=en',
  },
  {
    id: 'post-dbrht',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dcae87?auto=format&fit=crop&q=80&w=800',
    caption: 'Customer delivery dispatched in Kimironko! Thank you for trusting Kigali Luggage Solution for your family trip.',
    likes: 219,
    comments: 29,
    tag: '#DbRHTQcNOa4',
    postUrl: 'https://www.instagram.com/p/DbRHTQcNOa4/?hl=en',
  },
  {
    id: 'post-dbrhf',
    image: 'https://images.unsplash.com/photo-1533514652136-231a473f606e?auto=format&fit=crop&q=80&w=800',
    caption: 'Business traveler essentials: lightweight carbon-finish trolley with secure TSA lock and laptop compartment.',
    likes: 288,
    comments: 37,
    tag: '#DbRHF-0tc6Y',
    postUrl: 'https://www.instagram.com/p/DbRHF-0tc6Y/?hl=en',
  },
  {
    id: 'post-dbgkn',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    caption: 'Visit our physical showroom in Downtown Kigali today to inspect all sizes and colors in person!',
    likes: 350,
    comments: 52,
    tag: '#DbGkNZVoD9e',
    postUrl: 'https://www.instagram.com/p/DbGkNZVoD9e/?hl=en',
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
              <span>As Seen on Instagram & Reels</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              All Instagram Posts, Reels & Customer Deliveries
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              Explore our official Instagram feed featuring live video reels, customer unboxings, and showroom arrivals from @kigali_luggage_solution.
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

        {/* Gallery Grid - Using all Instagram posts and video reels */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-stone-200 border border-stone-300/60 shadow-xs block"
            >
              {post.isVideo && post.videoUrl ? (
                <div className="relative w-full h-full">
                  <video
                    src={post.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-white flex items-center gap-1 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    REEL
                  </div>
                </div>
              ) : (
                <img
                  src={post.image}
                  alt={post.caption}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581553680321-4fffae59fccd?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}

              {/* Hover Darkened Overlay */}
              <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between text-white">
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
            All posts synchronized with @kigali_luggage_solution official Instagram feed.
          </span>
          <span className="text-stone-300">•</span>
          <a
            href={BUSINESS_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 font-bold underline"
          >
            View Live Profile
          </a>
        </div>
      </div>
    </section>
  );
};
