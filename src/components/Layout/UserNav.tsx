import React, { useCallback } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useSession } from '@/hooks';
import { useSignOut } from '@/hooks/queries/auth';
import { useAppDispatch } from '@/hooks/rtk';
import { resetUserInfo } from '@/reducers/auth.reducer';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function UserNav({ styles, }: Props) {
  const session = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const qc = useQueryClient();
  const signOut = useSignOut(session?.tokens.accessToken);

  const onClickSignOut = useCallback(
    () => {
      signOut.mutate(null, {
        onSuccess() {
          dispatch(resetUserInfo());
          qc.invalidateQueries();
          router.push('/');
        },
        onError(error) {
          toast.error(error?.response.data.message);
        },
      });
    },
    [ signOut, ]
  );

  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        {session && session.user ? (
          <>
            <Link href='/user/mypage'>내 정보</Link>
            <button onClick={onClickSignOut}>로그아웃</button>
          </>
        ) : (
          <>
            <Link href='/signup'>회원가입</Link>
            <Link href='/signin'>로그인</Link>
          </>
        )}
      </nav>
    </>
  );
}
