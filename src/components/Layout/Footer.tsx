import React from 'react';
import tw, { TwStyle, css } from 'twin.macro';
import { SerializedStyles } from '@emotion/react';

interface Props {
  styles?: TwStyle | SerializedStyles;
}

export function Footer({ styles, }: Props) {
  const style = {
    default: css([
      tw`  `,
      styles,
    ]),
  };

  return (
    <>
      <footer css={style.default}>Footer</footer>
    </>
  );
}
