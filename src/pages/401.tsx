import React from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';

export default function UnAuthPage() {
  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='잘못된 인증 정보'>
        <div css={style.default}>
          <h2>올바른 인증 정보가 아닙니다.</h2>
          <p>다시 로그인하세요.</p>
        </div>
      </AppLayout>
    </>
  );
}
