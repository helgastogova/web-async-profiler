import type { AppProps } from 'next/app';

// import './globals.css';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </NextAuthSessionProvider>
  );
}

export default MyApp;
