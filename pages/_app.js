import '@/styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className='min-h-screen w-full text-black dark:bg-darkbg dark:text-white'>
        <div className='mx-auto max-w-7xl'>
          <Component {...pageProps} />
        </div>
      </div>
    </SWRConfig>
  );
}
