'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useCart } from '@/lib/cart';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, total, count } = useCart();
  const [{ isPending }] = usePayPalScriptReducer();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  function handleClose() {
    closeCart();
    setOrderSuccess(false);
    setOrderError('');
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 z-50 flex flex-col shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#C41E1E]" />
            <span className="text-white font-black uppercase tracking-widest text-sm">
              Cart {count > 0 && <span className="text-[#C41E1E]">({count})</span>}
            </span>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {orderSuccess ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-16 h-16 bg-[#C41E1E]/20 rounded-full flex items-center justify-center">
                <ShoppingBag size={28} className="text-[#C41E1E]" />
              </div>
              <h3 className="text-white font-black text-xl uppercase">Order Placed!</h3>
              <p className="text-gray-400 text-sm">
                Your order has been submitted. You&apos;ll receive a confirmation email soon.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 bg-[#C41E1E] hover:bg-[#E02020] text-white font-bold text-xs tracking-widest uppercase px-6 py-3 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <ShoppingBag size={40} className="text-gray-700" />
              <p className="text-gray-500 text-sm uppercase tracking-wider">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.variantId} className="flex gap-4 bg-black/40 p-4">
                  <div className="relative w-20 h-20 shrink-0 bg-zinc-800">
                    <Image
                      src={item.thumbnail}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-bold uppercase tracking-wide leading-tight mb-1 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-[#C41E1E] font-black text-sm mb-3">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 border border-white/10">
                        <button
                          onClick={() => updateQty(item.variantId, item.quantity - 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.variantId, item.quantity + 1)}
                          className="px-2 py-1 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-gray-600 hover:text-[#C41E1E] transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with PayPal */}
        {!orderSuccess && items.length > 0 && (
          <div className="px-6 py-5 border-t border-white/10 bg-zinc-950">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400 text-sm uppercase tracking-wider">Total</span>
              <span className="text-white font-black text-xl">${total.toFixed(2)}</span>
            </div>
            <p className="text-gray-600 text-xs mb-3 text-center">
              Shipping calculated at checkout
            </p>
            {orderError && (
              <p className="text-red-500 text-xs mb-3 text-center">{orderError}</p>
            )}
            {isPending ? (
              <div className="h-12 bg-zinc-800 animate-pulse rounded" />
            ) : (
              <PayPalButtons
                style={{ layout: 'vertical', color: 'black', label: 'pay', height: 45 }}
                createOrder={async () => {
                  const res = await fetch('/api/paypal/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items }),
                  });
                  const data = await res.json();
                  if (!res.ok) throw new Error(data.error ?? 'Failed to create order');
                  return data.orderId;
                }}
                onApprove={async (data) => {
                  setOrderError('');
                  const res = await fetch('/api/paypal/capture-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId: data.orderID, cartItems: items }),
                  });
                  const result = await res.json();
                  if (result.success) {
                    clearCart();
                    setOrderSuccess(true);
                  } else {
                    setOrderError(result.error ?? 'Payment failed. Please try again.');
                  }
                }}
                onError={() => {
                  setOrderError('PayPal encountered an error. Please try again.');
                }}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
