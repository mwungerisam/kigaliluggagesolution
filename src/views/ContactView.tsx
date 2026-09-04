import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  Truck,
  Send,
  Check,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_CONFIG, KIGALI_DISTRICTS } from '../config/business';

export const ContactView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Product Inquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    // Generate direct WhatsApp message with the contact form content
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
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-extrabold text-purple-700 uppercase tracking-wider">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact & Downtown Kigali Location
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Have questions about suitcase sizes, bulk orders, or same-day delivery? Contact our Downtown Kigali team via call, WhatsApp, or visit us in person.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Contact Details & Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Physical Store & Phone */}
          <div className="bg-white p-7 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-stone-100">
              Store Information
            </h2>

            <div className="space-y-4 text-xs">
              {/* Location */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold text-sm">Store Location</strong>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">{BUSINESS_CONFIG.location}</p>
                  <span className="text-[11px] text-purple-700 font-semibold mt-1 inline-block">
                    Kigali City Center / Downtown
                  </span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold text-sm">Phone Support</strong>
                  <a
                    href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                    className="text-slate-700 font-bold hover:text-purple-700 mt-0.5 block"
                  >
                    {BUSINESS_CONFIG.phoneDisplay}
                  </a>
                  <span className="text-[11px] text-slate-400">Available for calls & SMS</span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold text-sm">WhatsApp Ordering</strong>
                  <a
                    href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-700 font-bold hover:underline mt-0.5 block"
                  >
                    +250 781 157 188
                  </a>
                  <span className="text-[11px] text-slate-400">Fast replies & video unboxings</span>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold text-sm">Official Instagram</strong>
                  <a
                    href={BUSINESS_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-700 font-bold hover:underline mt-0.5 block"
                  >
                    {BUSINESS_CONFIG.instagramHandle}
                  </a>
                  <span className="text-[11px] text-slate-400">Daily arrivals & tagged photos</span>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 pt-3 border-t border-stone-100">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-bold text-sm">Opening Hours</strong>
                  <p className="text-slate-600 mt-0.5">{BUSINESS_CONFIG.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Scope Card */}
          <div className="bg-purple-900 text-white p-6 rounded-3xl space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>FREE KIGALI DELIVERY COVERAGE</span>
            </div>
            <p className="text-xs text-purple-100 leading-relaxed">
              We provide free doorstep delivery to all sectors in <strong>Gasabo</strong> (Kimironko, Remera, Kacyiru, Gisozi, etc.), <strong>Kicukiro</strong> (Gikondo, Niboye, Kagarama, Kanombe), and <strong>Nyarugenge</strong> (Downtown, Nyamirambo, Muhima).
            </p>
          </div>
        </div>

        {/* Right Column: Contact & Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Send Us a Message
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below to send an instant inquiry directly to our WhatsApp support desk.
              </p>
            </div>

            {sent && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-xs text-emerald-800">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Thank you! Your message has been prepared for WhatsApp. If it didn't open automatically, tap below.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Patrick Mugisha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 078X XXX XXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 font-semibold"
                >
                  <option value="Product Inquiry">Product Inquiry (Suitcases / Sets)</option>
                  <option value="Kigali Delivery Check">Delivery Inquiry (Kigali or Provinces)</option>
                  <option value="Size Recommendation">Airline Size & Weight Advice</option>
                  <option value="Bulk Order">Bulk / Organization Orders</option>
                  <option value="General Question">Other Question</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you're looking for, which suitcase size or color you prefer..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-slate-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Message to Kigali Luggage Solution</span>
              </button>
            </form>

            <div className="pt-4 border-t border-stone-100 text-center">
              <a
                href={`https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  'Hello Kigali Luggage Solution! I would like to chat directly.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Direct WhatsApp Chat: +250 781 157 188</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
