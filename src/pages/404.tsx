import React from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/src/layouts';

const NotPound404 = () => {
  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout
        title='에러-404'
        url='/404'
      >
        <div css={style.default}>페이지를 찾을 수 없습니다.</div>
      </AppLayout>
    </>
  );
};

export default NotPound404;
