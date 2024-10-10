import { CartContextProvider } from '@/components/cartContext'
import '../styles/globals.css'

import { SessionProvider } from "next-auth/react"
import { ConverterCurrencyProvider } from '@/components/currencyConverter'
import GoogleAnalytics from '../components/GoogleAnalytics'


export default function App({Component, pageProps: { session, ...pageProps }}) {
  return (
    <CartContextProvider>
      <ConverterCurrencyProvider>
        <SessionProvider session={session}>
          <GoogleAnalytics/>
          <Component {...pageProps}/>
        </SessionProvider>
      </ConverterCurrencyProvider>
    </CartContextProvider>

  )
}