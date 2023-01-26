import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { UIProvider, CartProvider, AuthProvider } from 'context';
import { SWRConfig } from 'swr';
import { lightTheme } from 'themes';


export default function App({ Component, pageProps }: AppProps) {
  return (
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
  ) 
}
