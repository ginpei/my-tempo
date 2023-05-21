import type { AppProps } from 'next/app';
import '../src/lib/firebase/instances';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
