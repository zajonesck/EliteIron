'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ChevronLeft } from 'lucide-react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useCart } from '@/lib/cart';
import type { ShippingAddress } from '@/lib/printful';

interface Rates {
  shipping: number;
  tax: number;
  shippingLabel: string;
}

const EMPTY_ADDRESS: ShippingAddress = {
  name: '', address1: '', city: '', state_code: '', country_code: 'US', zip: '',
};

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, clearCart, total, count } = useCart();
  const [{ isPending }] = usePayPalScriptReducer();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState('');
  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [address, setAddress] = useState<ShippingAddress>(EMPTY_ADDRESS);
  const [rates, setRates] = useState<Rates | null>(null);
  const [ratesError, setRatesError] = useState('');
  const [isLoadingRates, setIsLoadingRates] = useState(false);

  // Prevent background scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Reset rates when cart items change
  useEffect(() => {
    setRates(null);
    setRatesError('');
  }, [items]);

  function handleClose() {
    closeCart();
    setOrderSuccess(false);
    setOrderError('');
    setRates(null);
    setRatesError('');
    setStep('cart');
  }

  function setField(field: keyof ShippingAddress, value: string) {
    setAddress(prev => ({ ...prev, [field]: value }));
    setRates(null);
    setRatesError('');
  }

  async function calculateRates() {
    const { name, address1, city, state_code, zip } = address;
    if (!name || !address1 || !city || !state_code || !zip) {
      setRatesError('Please fill in all address fields.');
      return;
    }
    setIsLoadingRates(true);
    setRatesError('');
    try {
      const res = await fetch('/api/printful/shipping-rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, address }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Could not calculate shipping');
      setRates(data);
    } catch (err) {
      setRatesError(err instanceof Error ? err.message : 'Could not calculate shipping');
    } finally {
      setIsLoadingRates(false);
    }
  }

  const grandTotal = rates ? total + rates.shipping + rates.tax : total;

  const inputCls =
    'w-full bg-zinc-800 text-white text-sm px-3 py-2 border border-white/10 ' +
    'focus:outline-none focus:border-[#C41E1E] placeholder:text-gray-600';

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
        className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 z-50 flex flex-col shadow-2xl transition-transform duration-300"
        style={{ transform: isOpen ? 'none' : 'translateX(100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            {step === 'checkout' && (
              <button
                onClick={() => { setStep('cart'); setRates(null); setRatesError(''); }}
                className="text-gray-400 hover:text-white transition-colors mr-1"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            <ShoppingBag size={18} className="text-[#C41E1E]" />
            <span className="text-white font-black uppercase tracking-widest text-sm">
              {step === 'checkout' ? 'Checkout' : <>Cart {count > 0 && <span className="text-[#C41E1E]">({count})</span>}</>}
            </span>
          </div>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {orderSuccess ? (
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 text-center gap-4">
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
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-4 text-center gap-3">
              <ShoppingBag size={40} className="text-gray-700" />
              <p className="text-gray-500 text-sm uppercase tracking-wider">Your cart is empty</p>
            </div>
          ) : step === 'cart' ? (
            <>
              {/* Cart items */}
              <div className="px-6 py-4 flex flex-col gap-4">
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

              {/* Cart footer */}
              <div className="mt-auto px-6 py-5 border-t border-white/10 bg-zinc-950">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm uppercase tracking-wider">Subtotal</span>
                  <span className="text-white font-black text-xl">${total.toFixed(2)}</span>
                </div>
                <p className="text-gray-600 text-xs mb-4 text-center">
                  Shipping &amp; tax calculated at checkout
                </p>
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-[#C41E1E] hover:bg-[#E02020] text-white font-bold text-xs tracking-widest uppercase py-3 transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          ) : (
            /* ── Checkout step ── */
            <div className="px-6 py-5 flex flex-col gap-5">

              {/* Address form */}
              {!rates ? (
                <div className="flex flex-col gap-3">
                  <p className="text-gray-400 text-xs uppercase tracking-widest">Shipping Address</p>

                  <input
                    className={inputCls}
                    placeholder="Full name"
                    value={address.name}
                    onChange={e => setField('name', e.target.value)}
                  />
                  <input
                    className={inputCls}
                    placeholder="Street address"
                    value={address.address1}
                    onChange={e => setField('address1', e.target.value)}
                  />
                  <div className="flex gap-2">
                    <input
                      className={inputCls}
                      placeholder="City"
                      value={address.city}
                      onChange={e => setField('city', e.target.value)}
                    />
                    <input
                      className={`${inputCls} w-20 shrink-0`}
                      placeholder="State"
                      maxLength={2}
                      value={address.state_code}
                      onChange={e => setField('state_code', e.target.value.toUpperCase())}
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      className={inputCls}
                      placeholder="ZIP code"
                      value={address.zip}
                      onChange={e => setField('zip', e.target.value)}
                    />
                    <input
                      className={`${inputCls} w-20 shrink-0`}
                      placeholder="Country"
                      maxLength={2}
                      value={address.country_code}
                      onChange={e => setField('country_code', e.target.value.toUpperCase())}
                    />
                  </div>

                  {ratesError && (
                    <p className="text-red-500 text-xs">{ratesError}</p>
                  )}

                  <button
                    onClick={calculateRates}
                    disabled={isLoadingRates}
                    className="w-full bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white font-bold text-xs tracking-widest uppercase py-3 transition-colors"
                  >
                    {isLoadingRates ? 'Calculating…' : 'Calculate Shipping & Tax'}
                  </button>
                </div>
              ) : (
                /* Shipping address summary */
                <div className="bg-black/40 p-4 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="text-gray-400 leading-relaxed">
                      <p className="text-white font-bold">{address.name}</p>
                      <p>{address.address1}</p>
                      <p>{address.city}, {address.state_code} {address.zip} {address.country_code}</p>
                    </div>
                    <button
                      onClick={() => { setRates(null); setRatesError(''); }}
                      className="text-[#C41E1E] text-xs uppercase tracking-wider whitespace-nowrap hover:text-[#E02020] transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}

              {/* Order breakdown — shown once rates are loaded */}
              {rates && (
                <>
                  <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-sm">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Shipping ({rates.shippingLabel})</span>
                      <span>${rates.shipping.toFixed(2)}</span>
                    </div>
                    {rates.tax > 0 && (
                      <div className="flex justify-between text-gray-400">
                        <span>Tax</span>
                        <span>${rates.tax.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-white font-black text-lg mt-2 pt-2 border-t border-white/10">
                      <span>Total</span>
                      <span>${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {orderError && (
                    <p className="text-red-500 text-xs text-center">{orderError}</p>
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
                          body: JSON.stringify({ items, address }),
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
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
