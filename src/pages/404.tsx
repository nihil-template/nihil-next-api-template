import React from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';

export default function NotPoundPage() {
  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='페이지를 찾을 수 없습니다'>
        <div css={style.default}>
          페이지를 찾을 수 없습니다.
        </div>
      </AppLayout>
    </>
  );
}
