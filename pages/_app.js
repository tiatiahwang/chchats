import '@/styles/globals.css';
import '@/styles/quill-dark.css';
import 'react-quill/dist/quill.snow.css';
import { ThemeProvider, useTheme } from 'next-themes';
import { SWRConfig } from 'swr';
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    console.log(resolvedTheme);
  }, [resolvedTheme]);
  return (
    <SWRConfig
      value={{
        fetcher: (url) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <ThemeProvider attribute='class' enableSystem={true}>
        <div className='min-h-screen w-full text-black dark:bg-darkbg dark:text-white'>
          <div className='mx-auto max-w-7xl'>
            <Component {...pageProps} />
          </div>
        </div>
      </ThemeProvider>
    </SWRConfig>
  );
}
