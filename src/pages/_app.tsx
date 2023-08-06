import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Providers } from '@/layouts';
import '@/styles/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps, }: AppProps) => (
  <Providers>
    <Head>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0'
      />
    </Head>
    <Component {...pageProps} />
  </Providers>
);

export default App;
