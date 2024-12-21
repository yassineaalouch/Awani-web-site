import { CartContextProvider } from '@/context/cartContext'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ConverterCurrencyProvider } from '@/components/currencyConverter'
import Script from 'next/script'
import FilterLocalContextProvider from '@/context/FilterLocalContext'


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <CartContextProvider>
      <FilterLocalContextProvider>
        <ConverterCurrencyProvider>
          <SessionProvider session={session}>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script
              id="google-analytics"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
            <Component {...pageProps} />
          </SessionProvider>
        </ConverterCurrencyProvider>
      </FilterLocalContextProvider>
    </CartContextProvider>

  )
}