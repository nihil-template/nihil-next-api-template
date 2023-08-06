import React, { useCallback, useState } from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from '@/hooks';
import { useSignOut } from '@/hooks/queries/auth';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function UserNav({ styles, }: Props) {
  const [ isSignOut, setIsSignOut, ] = useState(false);
  const session = useSession();
  const router = useRouter();

  const qc = useQueryClient();
  useSignOut(session?.user.id, isSignOut);

  const onClickSignOut = useCallback(
    () => {
      setIsSignOut(true);
      qc.invalidateQueries();
      router.push('/');
    },
    []
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
            <Link href='/user/me'>내 정보</Link>
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
