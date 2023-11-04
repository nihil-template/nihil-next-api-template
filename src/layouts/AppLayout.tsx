import React from 'react';
import { Global } from '@emotion/react';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';
import { ToastContainer } from 'react-toastify';
import {
  Footer, Header, Main, Meta
} from '@/src/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/src/types/site.types';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const router = useRouter();

  const meta: IMetaData = {
    title,
    url: router.asPath,
    description,
    keywords,
    author,
    image,
    tags,
    type,
    section,
    created,
    updated,
  };

  const style = {
    global: css([
      '@import url(https://fonts.googleapis.com/earlyaccess/notosanskr.css)',
      '@import url(https://fonts.cdnfonts.com/css/cascadia-code)',
      tw` [*]:( box-border p-0 m-0 font-sans ) `,
    ]),
  };

  return (
    <>
      <Global styles={style.global} />
      <Meta meta={meta} />

      <Header />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={4000}
        pauseOnFocusLoss={false}
      />
    </>
  );
}
