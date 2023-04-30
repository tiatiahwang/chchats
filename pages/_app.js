import '@/styles/globals.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((response) => response.json()),
      }}
    >
      <div className='w-full max-w-xl mx-auto'>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
