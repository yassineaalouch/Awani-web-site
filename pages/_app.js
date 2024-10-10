import { CartContextProvider } from '@/components/cartContext'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { ConverterCurrencyProvider } from '@/components/currencyConverter'


export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <CartContextProvider>
      <ConverterCurrencyProvider>
        <SessionProvider session={session}>
          <Component {...pageProps}/>
        </SessionProvider>
      </ConverterCurrencyProvider>
    </CartContextProvider>

  )
}