import React, { useState } from 'react';
import {
  MessageCircle,
  Check,
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
        <h2 className="text-xl font-bold text-[#18181B] uppercase">Your Bag is Empty</h2>
        <p className="text-xs text-[#71717A]">
          Please add items to your bag before proceeding to checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-2.5 bg-[#18181B] text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
        >
          View Catalog
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
      errors.phone = 'Please enter a valid phone number';
    }
    if (!formData.addressDetails.trim()) {
      errors.addressDetails = 'Please provide your address or landmark in Kigali';
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
      deliveryFee: 0,
      total: subtotal,
      status: 'Pending Confirmation',
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setSubmittedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 400);
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
        <div className="bg-white p-8 sm:p-10 border border-[#E4E4E7] space-y-6">
          <div className="w-12 h-12 bg-[#18181B] text-white flex items-center justify-center">
            <Check className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] block">
              Order Ref #{submittedOrder.id}
            </span>
            <h1 className="text-2xl font-bold text-[#18181B] uppercase tracking-tight">
              Order Received
            </h1>
            <p className="text-xs text-[#71717A]">
              We will contact you at <strong className="text-[#18181B]">{submittedOrder.customer.phone}</strong> to confirm your Kigali delivery time.
            </p>
          </div>

          <div className="p-4 bg-[#F4F4F5] border border-[#E4E4E7] text-xs space-y-1">
            <span className="font-bold text-[#18181B] uppercase tracking-wider text-[11px] block">
              Delivery Address:
            </span>
            <p className="text-[#52525B]">
              {submittedOrder.customer.addressDetails}, {submittedOrder.customer.sector}, {submittedOrder.customer.district} (Kigali)
            </p>
          </div>

          {/* WhatsApp Direct Option */}
          <div className="space-y-2">
            <a
              id="confirm-whatsapp-order-btn"
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirm Order on WhatsApp ({BUSINESS_CONFIG.phoneDisplay})</span>
            </a>
          </div>

          {/* Order Summary Details */}
          <div className="border-t border-[#E4E4E7] pt-6 space-y-3">
            <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider">
              Summary
            </h3>
            <div className="space-y-2">
              {submittedOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1 border-b border-[#F4F4F5]">
                  <span className="text-[#71717A]">
                    {item.quantity}x {item.product.name} ({item.selectedColor}, {item.selectedSize})
                  </span>
                  <span className="font-semibold text-[#18181B]">
                    {formatRWF(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 flex justify-between text-sm font-bold text-[#18181B]">
              <span>Total (Pay on Delivery)</span>
              <span>{formatRWF(submittedOrder.total)}</span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => navigateTo('shop')}
              className="w-full sm:w-auto px-6 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // CHECKOUT FORM SCREEN
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#18181B] tracking-tight uppercase">
          Checkout
        </h1>
        <p className="text-xs text-[#71717A] mt-1">
          Complimentary doorstep delivery in Kigali. Pay upon inspection via Cash or Mobile Money.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form */}
        <div className="lg:col-span-7 space-y-6">
          {/* Contact Details */}
          <div className="bg-white p-6 border border-[#E4E4E7] space-y-4">
            <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
              1. Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diane Uwase"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border ${
                    formErrors.fullName ? 'border-red-500' : 'border-[#E4E4E7]'
                  } focus:outline-none focus:border-[#18181B]`}
                />
                {formErrors.fullName && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0781 157 188"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 text-xs bg-white border ${
                    formErrors.phone ? 'border-red-500' : 'border-[#E4E4E7]'
                  } focus:outline-none focus:border-[#18181B]`}
                />
                {formErrors.phone && (
                  <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                placeholder="e.g. name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
              />
            </div>
          </div>

          {/* Delivery Location */}
          <div className="bg-white p-6 border border-[#E4E4E7] space-y-4">
            <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
              2. Delivery Address in Kigali
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  District *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleDistrictChange(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
                >
                  {Object.keys(KIGALI_DISTRICTS).map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs text-[#71717A] mb-1">
                  Sector *
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
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
              <label className="block text-xs text-[#71717A] mb-1">
                Address / Street / Landmark *
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Near Kimironko Market, House 12, or Office building name"
                value={formData.addressDetails}
                onChange={(e) => setFormData({ ...formData, addressDetails: e.target.value })}
                className={`w-full px-3 py-2 text-xs bg-white border ${
                  formErrors.addressDetails ? 'border-red-500' : 'border-[#E4E4E7]'
                } focus:outline-none focus:border-[#18181B]`}
              />
              {formErrors.addressDetails && (
                <p className="text-[11px] text-red-600 mt-1">{formErrors.addressDetails}</p>
              )}
            </div>

            <div>
              <label className="block text-xs text-[#71717A] mb-1">
                Order Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Call before dispatch"
                value={formData.orderNotes}
                onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-white border border-[#E4E4E7] focus:outline-none focus:border-[#18181B]"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white p-6 border border-[#E4E4E7] space-y-4">
            <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
              3. Payment Method (Pay on Delivery)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 border text-left cursor-pointer transition-colors flex flex-col justify-between ${
                  formData.paymentMethod === 'cash_on_delivery'
                    ? 'border-[#18181B] bg-[#18181B] text-white'
                    : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#18181B]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">Cash on Delivery</span>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                    className="accent-white"
                  />
                </div>
                <span className={`text-[11px] ${formData.paymentMethod === 'cash_on_delivery' ? 'text-[#D4D4D8]' : 'text-[#71717A]'}`}>
                  Pay cash upon inspecting luggage
                </span>
              </label>

              <label
                className={`p-3.5 border text-left cursor-pointer transition-colors flex flex-col justify-between ${
                  formData.paymentMethod === 'momo_on_delivery'
                    ? 'border-[#18181B] bg-[#18181B] text-white'
                    : 'border-[#E4E4E7] bg-white text-[#18181B] hover:border-[#18181B]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold uppercase">Mobile Money (MoMo)</span>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={formData.paymentMethod === 'momo_on_delivery'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'momo_on_delivery' })}
                    className="accent-white"
                  />
                </div>
                <span className={`text-[11px] ${formData.paymentMethod === 'momo_on_delivery' ? 'text-[#D4D4D8]' : 'text-[#71717A]'}`}>
                  MTN / Airtel MoMo on delivery
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 border border-[#E4E4E7] space-y-5 sticky top-24">
            <h2 className="text-xs font-bold text-[#18181B] uppercase tracking-wider pb-2 border-b border-[#E4E4E7]">
              Order Summary ({items.length} {items.length === 1 ? 'item' : 'items'})
            </h2>

            {/* Items List */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {items.map((it) => (
                <div
                  key={`${it.product.id}-${it.selectedColor}-${it.selectedSize}`}
                  className="flex items-center gap-3 text-xs"
                >
                  <div className="w-12 h-12 bg-[#F4F4F5] p-1 shrink-0 border border-[#E4E4E7]">
                    <img
                      src={it.product.images[0]}
                      alt={it.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-[#18181B] uppercase truncate">{it.product.name}</h4>
                    <span className="text-[11px] text-[#71717A] block">
                      Qty: {it.quantity} • {it.selectedColor}
                    </span>
                  </div>
                  <span className="font-bold text-[#18181B] shrink-0">
                    {formatRWF(it.product.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 pt-3 border-t border-[#E4E4E7] text-xs">
              <div className="flex justify-between text-[#71717A]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18181B]">{formatRWF(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Delivery (Kigali)</span>
                <span className="font-bold text-[#18181B]">FREE</span>
              </div>
              <div className="pt-2 border-t border-[#E4E4E7] flex justify-between text-sm font-bold text-[#18181B]">
                <span>Total Due</span>
                <span>{formatRWF(subtotal)}</span>
              </div>
            </div>

            <button
              id="place-order-submit-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:bg-[#A1A1AA]"
            >
              {isSubmitting ? 'Processing Order...' : 'Confirm Order (Free Kigali Delivery)'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
