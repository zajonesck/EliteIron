'use client';

import { ReactNode } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CartProvider } from '@/lib/cart';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <CartProvider>{children}</CartProvider>
    </PayPalScriptProvider>
  );
}
