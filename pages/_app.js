import '@/styles/globals.css';
import '@/styles/quill-dark.css';
import 'react-quill/dist/quill.snow.css';
import { ThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <ThemeProvider attribute='class' enableSystem={true}>
        <div className='min-h-screen w-full text-black dark:bg-darkbg dark:text-white'>
          <div className='mx-auto max-w-6xl min-w-[400px] px-4'>
            <Component {...pageProps} />
            <footer className='text-center text-sm p-4'>
              COPYRIGHT @CHCATS 2023
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </SWRConfig>
  );
}
