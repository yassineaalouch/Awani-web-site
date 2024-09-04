import { CartContextProvider } from '@/components/cartContext'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { ConverterCurrencyProvider } from '@/components/currencyConverter'


import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <CartContextProvider>
      <ConverterCurrencyProvider>
        <SessionProvider session={session}>
          <Component {...pageProps}/>
          <SpeedInsights/>
          <Analytics />
        </SessionProvider>
      </ConverterCurrencyProvider>
    </CartContextProvider>

  )
}