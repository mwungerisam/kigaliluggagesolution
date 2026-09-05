import React, { useState } from 'react';
import {
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    const fullMessage = `Hello Kigali Luggage Solution! My name is ${name} (${phone || 'No phone provided'}). 
Subject: ${subject}
Message: ${message}`;

    const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      fullMessage
    )}`;

    window.open(whatsappUrl, '_blank');
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
          Get in Touch
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight uppercase mt-1">
          Contact & Location
        </h1>
        <p className="text-xs text-[#71717A] mt-1">
          Questions regarding dimensions, stock availability, or same-day Kigali delivery? Contact our team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-[#E4E4E7] space-y-6">
            <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
              Store Information
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-0.5">
                  Location
                </span>
                <p className="font-semibold text-[#18181B]">{BUSINESS_CONFIG.location}</p>
                <p className="text-[#71717A] text-[11px] mt-0.5">Kigali City Center, Rwanda</p>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-0.5">
                  Phone / WhatsApp
                </span>
                <a
                  href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                  className="font-semibold text-[#18181B] hover:underline block"
                >
                  {BUSINESS_CONFIG.phoneDisplay}
                </a>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-0.5">
                  Instagram
                </span>
                <a
                  href={BUSINESS_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#18181B] hover:underline inline-flex items-center gap-1"
                >
                  <span>{BUSINESS_CONFIG.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="pt-3 border-t border-[#F4F4F5]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A] block mb-0.5">
                  Hours
                </span>
                <p className="text-[#18181B]">{BUSINESS_CONFIG.openingHours}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F4F4F5] p-5 border border-[#E4E4E7] text-xs space-y-1">
            <span className="font-bold text-[#18181B] uppercase tracking-wider text-[11px] block">
              Free Kigali Delivery
            </span>
            <p className="text-[#52525B] leading-relaxed">
              Complimentary doorstep delivery to Gasabo, Kicukiro, and Nyarugenge. Payment upon physical inspection.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 border border-[#E4E4E7] space-y-6">
            <div>
              <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
                Send an Inquiry
              </h2>
            </div>

            {sent && (
              <div className="p-3.5 bg-[#F4F4F5] border border-[#E4E4E7] text-xs text-[#18181B]">
                Your message has been prepared. If WhatsApp did not open automatically, please tap the WhatsApp button below.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#71717A] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patrick Mugisha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#71717A] mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 078X XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
                >
                  <option value="Product Inquiry">Product Inquiry (Suitcase / Sets)</option>
                  <option value="Kigali Delivery Check">Delivery Inquiry</option>
                  <option value="Size Recommendation">Airline Sizing Advice</option>
                  <option value="Bulk Order">Bulk / Organization Orders</option>
                  <option value="General Question">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what size, style, or color you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Send via WhatsApp
              </button>
            </form>

            <div className="pt-3 border-t border-[#E4E4E7] text-center">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kigali Luggage Solution! I would like to chat directly.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#18181B] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Or direct message on WhatsApp ({BUSINESS_CONFIG.phoneDisplay})</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Location Section */}
      <div className="bg-white p-6 sm:p-8 border border-[#E4E4E7] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#E4E4E7]">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#990000] block">
              Store Location
            </span>
            <h2 className="text-xl font-bold text-[#18181B] uppercase tracking-tight">
              Google Maps Location
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              Find Kigali Luggage Solution on Google Maps or get instant driving directions.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=Kigali+Luggage+Solution,Kigali,Rwanda"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#990000] hover:bg-[#800000] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-center"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in Google Maps</span>
          </a>
        </div>

        <div className="w-full h-80 sm:h-96 border border-[#E4E4E7] overflow-hidden bg-zinc-100">
          <iframe
            title="Kigali Luggage Solution Google Location Map"
            src="https://maps.google.com/maps?q=-1.9536,30.0592(Kigali+Luggage+Solution)&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};
