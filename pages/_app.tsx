import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UIProvider, CartProvider, AuthProvider } from 'context';
import { SWRConfig } from 'swr';
import { lightTheme } from 'themes';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT || '' }}>
        <SWRConfig 
          value={{
            fetcher: ( resource, init ) => fetch( resource, init ).then( res => res.json() )
          }}
        >
          <AuthProvider>  
            <CartProvider>
              <UIProvider>
                <ThemeProvider theme={ lightTheme }>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UIProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  ) 
}
