import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout title="Smart Ping - AI-Powered Update Feed">
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;