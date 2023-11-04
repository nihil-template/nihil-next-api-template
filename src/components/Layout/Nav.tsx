import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';
import Link from 'next/link';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Nav({ styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <nav css={style.default}>
        <Link href='/'>홈</Link>
        <Link href='/example'>예시</Link>
      </nav>
    </>
  );
}
