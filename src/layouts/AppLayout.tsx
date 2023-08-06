import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import { useRouter } from 'next/router';
import tw, { css } from 'twin.macro';
import { ToastContainer } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import {
  Footer, Header, Main, Meta
} from '@/components/Layout';
import { IAppLayoutProps, IMetaData } from '@/types/site.types';
import { IsLoading } from '@/components/Content';
import { useSession } from '@/hooks';
import { useRefresh } from '@/hooks/queries/auth';

export function AppLayout({
  children, title, description, keywords, author, image, created, updated, tags, type, section,
}: IAppLayoutProps) {
  const { asPath, } = useRouter();

  const qc = useQueryClient();
  const session = useSession();

  const refresh = useRefresh(session?.tokens.refreshToken);

  useEffect(() => {
    console.log('refresh >> ', refresh);

    const diff = Math.round(((session.tokens.accessExp * 1000) - Date.now()) / 1000);

    if (diff <= 150) {
      refresh.mutate(null, {
        onSuccess(result) {
          session.tokens = result.body;
          qc.invalidateQueries();
        },
      });
    }
  }, [ asPath, ]);

  const meta: IMetaData = {
    title,
    url: asPath,
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
      <IsLoading />
      <Main>{children}</Main>
      <Footer />
      <ToastContainer
        position='top-right'
        theme='colored'
        autoClose={5000}
        pauseOnFocusLoss={false}
      />
    </>
  );
}
