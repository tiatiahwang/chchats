import '@/styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((response) => response.json()),
      }}
    >
      <div className='w-full mx-auto max-w-7xl dark:bg-[#374151]'>
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
