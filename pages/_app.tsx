import { AppProps } from 'next/app';

import { FontProvider } from '../contexts/FontContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FontProvider>
      <Component {...pageProps} />
    </FontProvider>
  );
}

export default MyApp;
