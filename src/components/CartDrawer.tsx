import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-[2px] transition-opacity">
      <div
        className="w-full max-w-md bg-[#FAFAF9] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#E4E4E7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E4E4E7] flex items-center justify-between bg-white">
          <div>
            <h2 className="font-bold text-[#18181B] text-sm uppercase tracking-wide">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#71717A]">{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={closeCart}
            className="p-1.5 text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Bar */}
        <div className="bg-[#18181B] text-white px-5 py-2 flex items-center justify-between text-[11px] font-medium tracking-wide">
          <span>FREE DELIVERY IN KIGALI</span>
          <span className="text-[#A1A1AA]">INCLUDED</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="space-y-1">
                <h3 className="font-bold text-[#18181B] text-base uppercase">
                  Your bag is empty
                </h3>
                <p className="text-xs text-[#71717A] max-w-xs">
                  Explore our selection of premium suitcases and travel bags.
                </p>
              </div>
              <button
                id="empty-cart-explore-btn"
                onClick={handleExploreClick}
                className="px-6 py-2.5 bg-[#18181B] hover:bg-black text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                View Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                className="flex gap-3.5 p-3.5 border border-[#E4E4E7] bg-white"
              >
                {/* Product Thumbnail */}
                <div className="w-16 h-16 bg-[#F4F4F5] p-1.5 flex items-center justify-center shrink-0 border border-[#E4E4E7]">
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
                      <h4 className="text-xs font-bold text-[#18181B] uppercase line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-[#A1A1AA] hover:text-[#18181B] transition-colors p-0.5 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#71717A] mt-0.5 space-x-2">
                      {item.selectedColor && (
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                      )}
                      {item.selectedSize && (
                        <span>• Size: <strong>{item.selectedSize}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#F4F4F5]">
                    <div className="flex items-center border border-[#E4E4E7] bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="px-2 py-0.5 text-xs text-[#18181B] hover:bg-[#F4F4F5] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-semibold text-[#18181B] min-w-[20px] text-center">
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
                        className="px-2 py-0.5 text-xs text-[#18181B] hover:bg-[#F4F4F5] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#18181B]">
                      {formatRWF(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals & CTAs */}
        {items.length > 0 && (
          <div className="p-5 border-t border-[#E4E4E7] bg-white space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#71717A]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#18181B]">{formatRWF(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#71717A]">
                <span>Delivery (Kigali)</span>
                <span className="font-bold text-[#18181B]">FREE</span>
              </div>
              <div className="border-t border-[#E4E4E7] pt-2 flex justify-between text-sm font-bold text-[#18181B]">
                <span>Total</span>
                <span>{formatRWF(subtotal)}</span>
              </div>
            </div>

            <button
              id="cart-proceed-checkout-btn"
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 bg-[#18181B] hover:bg-black text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              id="cart-order-whatsapp-btn"
              href={whatsappCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 bg-white hover:bg-[#F4F4F5] text-[#18181B] border border-[#E4E4E7] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Send Bag to WhatsApp</span>
            </a>

            <p className="text-[10px] text-center text-[#71717A] uppercase tracking-wider">
              Pay upon inspection in Kigali (Cash or Mobile Money)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
