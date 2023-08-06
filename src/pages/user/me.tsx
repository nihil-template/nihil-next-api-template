import React, { useEffect } from 'react';
import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router';
import { useMe } from '@/hooks/queries/auth';
import { AppLayout } from '@/layouts';
import { dateFormat } from '@/utils/date';
import { useSession } from '@/hooks';

export default function MyInfoPage() {
  const session = useSession();
  const router = useRouter();

  const { data, isError, } = useMe(session?.tokens.accessToken);

  useEffect(() => {
    if (!session || isError) {
      router.push('/401');
    }
  }, [ session, isError, ]);

  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='내 정보'>
        <div css={style.default}>
          <div>아이디: {data?.email}</div>
          <div>별명: {data?.userName}</div>
          <div>가입일: {dateFormat(data?.created, 'YYYY-MM-DD')}</div>
        </div>
      </AppLayout>
    </>
  );
}
