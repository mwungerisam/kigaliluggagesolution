import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageCircle, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useShop } from '../context/ShopContext';
import { formatRWF, getCartWhatsAppUrl, BUSINESS_CONFIG } from '../config/business';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    cartCount,
  } = useCart();
  const { navigateTo } = useShop();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    closeCart();
    navigateTo('checkout');
  };

  const handleExploreClick = () => {
    closeCart();
    navigateTo('shop');
  };

  const whatsappCheckoutUrl = getCartWhatsAppUrl({
    items: items.map((it) => ({
      name: it.product.name,
      quantity: it.quantity,
      price: it.product.price,
      color: it.selectedColor,
      size: it.selectedSize,
    })),
    total: subtotal,
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300 border-l border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-900 text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base">Your Shopping Cart</h2>
              <span className="text-xs text-slate-500">{cartCount} {cartCount === 1 ? 'item' : 'items'} selected</span>
            </div>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-stone-200 text-slate-500 hover:text-slate-900 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-purple-900 text-white px-5 py-2.5 flex items-center gap-3 text-xs">
          <Truck className="w-4 h-4 text-purple-300 shrink-0" />
          <div>
            <span className="font-bold text-purple-200 uppercase tracking-wide mr-1.5">Free Kigali Delivery</span>
            <span className="text-purple-100">Eligible on all items in your cart</span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center text-slate-300">
                <ShoppingBag className="w-10 h-10 text-slate-400" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-800 text-lg">
                  Your cart is waiting for your next journey.
                </h3>
                <p className="text-xs text-slate-500 max-w-xs">
                  Browse our durable suitcases, carry-ons, and travel accessories ready for delivery in Kigali.
                </p>
              </div>
              <button
                id="empty-cart-explore-btn"
                onClick={handleExploreClick}
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Explore Luggage
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-3.5 p-3 rounded-xl border border-stone-200 bg-white hover:border-purple-200 transition-all"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-stone-100 p-2 flex items-center justify-center shrink-0 border border-stone-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1 -mr-1 -mt-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-0.5 space-x-2">
                      {item.selectedColor && (
                        <span>Color: <strong className="text-slate-700">{item.selectedColor}</strong></span>
                      )}
                      {item.selectedSize && (
                        <span>• Size: <strong className="text-slate-700">{item.selectedSize}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1">
                    <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-stone-200"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 py-0.5 text-xs font-bold text-slate-900 min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2 py-0.5 text-xs text-slate-600 hover:bg-stone-200"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900">
                        {formatRWF(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals & CTAs */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatRWF(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery in Kigali</span>
                <span className="font-bold text-emerald-600 uppercase text-[11px]">Free</span>
              </div>
              <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-black text-slate-900">
                <span>Estimated Total</span>
                <span className="text-base text-purple-900 font-extrabold">{formatRWF(subtotal)}</span>
              </div>
            </div>

            {/* Primary Checkout CTA */}
            <button
              id="cart-proceed-checkout-btn"
              onClick={handleCheckoutClick}
              className="w-full py-3 px-4 bg-slate-900 hover:bg-purple-900 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary WhatsApp Checkout Button */}
            <a
              id="cart-order-whatsapp-btn"
              href={whatsappCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Cart via WhatsApp</span>
            </a>

            <p className="text-[11px] text-center text-slate-400">
              Pay on Delivery (Cash or MoMo) • Kigali Rwanda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
