import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
  Phone,
  MapPin,
  Banknote,
  Smartphone,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';
import {
  formatRWF,
  KIGALI_DISTRICTS,
  BUSINESS_CONFIG,
  getCartWhatsAppUrl,
} from '../config/business';
import { CheckoutFormData, OrderRecord } from '../types';

export const CheckoutView: React.FC = () => {
  const { items, subtotal, clearCart } = useCart();
  const { navigateTo } = useShop();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    email: '',
    district: 'Gasabo',
    sector: KIGALI_DISTRICTS['Gasabo'][0] || '',
    addressDetails: '',
    orderNotes: '',
    paymentMethod: 'cash_on_delivery',
  });

  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If cart is empty and no submitted order yet
  if (items.length === 0 && !submittedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto text-slate-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-slate-500">
          Please add items to your cart before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition-colors"
        >
          Explore Luggage Catalog
        </button>
      </div>
    );
  }

  const handleDistrictChange = (district: string) => {
    const sectors = KIGALI_DISTRICTS[district] || [];
    setFormData((prev) => ({
      ...prev,
      district,
      sector: sectors[0] || '',
    }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number (e.g., 0781157188)';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      errors.phone = 'Please enter a valid Rwandan phone number';
    }
    if (!formData.addressDetails.trim()) {
      errors.addressDetails = 'Please provide a house number, street, or landmark';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const newOrder: OrderRecord = {
      id: `KLS-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      customer: { ...formData },
      subtotal,
      deliveryFee: 0, // Free in Kigali
      total: subtotal,
      status: 'Pending Confirmation',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setSubmittedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 600);
  };

  // SUCCESS ORDER SCREEN
  if (submittedOrder) {
    const orderWhatsAppUrl = getCartWhatsAppUrl({
      items: submittedOrder.items.map((it) => ({
        name: it.product.name,
        quantity: it.quantity,
        price: it.product.price,
        color: it.selectedColor,
        size: it.selectedSize,
      })),
      total: submittedOrder.total,
      customerName: submittedOrder.customer.fullName,
      phone: submittedOrder.customer.phone,
      district: submittedOrder.customer.district,
      sector: submittedOrder.customer.sector,
      address: submittedOrder.customer.addressDetails,
      orderNotes: submittedOrder.customer.orderNotes,
    });

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <Check className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Order Received • Order Ref #{submittedOrder.id}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Murakoze! Your Order Has Been Placed
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Our Downtown Kigali team has received your order and will contact you at{' '}
              <strong className="text-slate-800">{submittedOrder.customer.phone}</strong> to confirm the exact delivery time.
            </p>
          </div>

          {/* Delivery Note */}
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-200 text-left space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-900">
              <Truck className="w-4 h-4 text-purple-700" />
              <span>FREE DELIVERY IN KIGALI</span>
            </div>
            <p className="text-xs text-purple-950">
              Delivering to: <strong className="font-semibold">{submittedOrder.customer.addressDetails}, {submittedOrder.customer.sector}, {submittedOrder.customer.district}</strong>
            </p>
          </div>

          {/* Primary Recommended Action: Notify WhatsApp for instant confirmation */}
          <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              Want instant same-day confirmation? Send your order summary to WhatsApp:
            </span>
            <a
              id="confirm-whatsapp-order-btn"
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>SEND ORDER TO WHATSAPP (+250 781 157 188)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Order Summary Details */}
          <div className="border-t border-stone-100 pt-6 text-left space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Order Summary
            </h3>
            <div className="space-y-2">
              {submittedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-stone-100 last:border-0">
                  <span className="text-slate-700">
                    {item.quantity}x {item.product.name} ({item.selectedColor}, {item.selectedSize})
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatRWF(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between text-sm font-black text-slate-900">
              <span>Total to Pay on Delivery</span>
              <span className="text-purple-900">{formatRWF(submittedOrder.total)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-purple-900 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-6 py-2.5 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div>
        <button
          onClick={() => navigateTo('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Checkout & Kigali Delivery
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Simple Rwanda-focused checkout. No online card required — pay cash or mobile money upon inspecting your luggage.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form: Customer Details & Delivery Address (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Customer Info Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diane Uwase"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 ${
                    formErrors.fullName ? 'border-rose-500' : 'border-stone-300'
                  }`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0781 157 188"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3.5 py-2.5 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 ${
                    formErrors.phone ? 'border-rose-500' : 'border-stone-300'
                  }`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email Address <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600"
              />
            </div>
          </div>

          {/* Delivery Address Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                Delivery Location (Rwanda)
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Free Delivery in Kigali
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  District <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 font-semibold"
                >
                  {Object.keys(KIGALI_DISTRICTS).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sector / Area <span className="text-rose-500">*</span>
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 font-semibold"
                >
                  {(KIGALI_DISTRICTS[formData.district] || []).map((sec) => (
                    <option key={sec} value={sec}>
                      {sec}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Detailed Delivery Address / Landmark <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. KG 15 Ave near Kimironko Market, House #14, or office name"
                value={formData.addressDetails}
                onChange={(e) => setFormData({ ...formData, addressDetails: e.target.value })}
                className={`w-full px-3.5 py-2 text-xs bg-stone-50 border rounded-xl focus:outline-none focus:bg-white focus:border-purple-600 ${
                  formErrors.addressDetails ? 'border-rose-500' : 'border-stone-300'
                }`}
              />
              {formErrors.addressDetails && (
                <p className="text-[11px] text-rose-500 mt-1">{formErrors.addressDetails}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Order Notes <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Please deliver after 2:00 PM or call me on arrival"
                value={formData.orderNotes}
                onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:bg-white focus:border-purple-600"
              />
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-700 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              Payment Method (On Delivery)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Banknote className="w-5 h-5 text-purple-700" />
                  <input
                    type="radio"
                    name="payment-method"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                    className="accent-purple-700"
                  />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Cash on Delivery</strong>
                  <span className="text-[11px] text-slate-500">Pay cash upon inspecting luggage</span>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'momo_on_delivery'
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Smartphone className="w-5 h-5 text-purple-700" />
                  <input
                    type="radio"
                    name="payment-method"
                    checked={formData.paymentMethod === 'momo_on_delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'momo_on_delivery' })}
                    className="accent-purple-700"
                  />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">Mobile Money</strong>
                  <span className="text-[11px] text-slate-500">MTN MoMo or Airtel on delivery</span>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  formData.paymentMethod === 'whatsapp_confirmation'
                    ? 'border-purple-600 bg-purple-50/50 ring-2 ring-purple-600/10'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <MessageCircle className="w-5 h-5 text-emerald-600" />
                  <input
                    type="radio"
                    name="payment-method"
                    checked={formData.paymentMethod === 'whatsapp_confirmation'}
                    onChange={() =>
                      setFormData({ ...formData, paymentMethod: 'whatsapp_confirmation' })
                    }
                    className="accent-purple-700"
                  />
                </div>
                <div>
                  <strong className="text-xs font-bold text-slate-900 block">WhatsApp Pay</strong>
                  <span className="text-[11px] text-slate-500">Confirm payment with store staff</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5 sticky top-28">
            <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-stone-100">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div
                  key={`${it.product.id}-${it.selectedColor}-${it.selectedSize}`}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="w-12 h-12 rounded-xl bg-stone-100 p-1 shrink-0">
                    <img
                      src={it.product.images[0]}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 truncate">{it.product.name}</h4>
                    <span className="text-[11px] text-slate-500 block">
                      Qty: {it.quantity} • {it.selectedColor}
                    </span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">
                    {formatRWF(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">{formatRWF(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery in Kigali</span>
                <span className="font-extrabold text-emerald-600 uppercase text-[11px]">FREE</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-black text-slate-900">
                <span>Total Due</span>
                <span className="text-purple-900 font-extrabold">{formatRWF(subtotal)}</span>
              </div>
            </div>

            {/* Submit Place Order Button */}
            <button
              id="place-order-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 bg-slate-900 hover:bg-purple-900 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:bg-stone-400"
            >
              {isSubmitting ? (
                <span>Processing Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Order (Free Kigali Delivery)</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Option */}
            <div className="pt-2 text-center">
              <span className="text-[11px] text-slate-400 block mb-2">Prefer to order directly via WhatsApp?</span>
              <a
                href={getCartWhatsAppUrl({
                  items: items.map((it) => ({
                    name: it.product.name,
                    quantity: it.quantity,
                    price: it.product.price,
                    color: it.selectedColor,
                    size: it.selectedSize,
                  })),
                  total: subtotal,
                  customerName: formData.fullName,
                  phone: formData.phone,
                  district: formData.district,
                  sector: formData.sector,
                  address: formData.addressDetails,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Fast-track on WhatsApp</span>
              </a>
            </div>

            {/* Reassurance */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-slate-500 space-y-1">
              <span className="font-bold text-slate-800 block">Kigali Luggage Guarantee:</span>
              <p>You inspect your suitcases thoroughly upon delivery before making payment.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
