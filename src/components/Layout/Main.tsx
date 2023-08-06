import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  styles?: TwStyle | SerializedStyles;
  children: React.ReactNode;
}

export function Main({ styles, children, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <main css={style.default}>{children}</main>
    </>
  );
}
