import React from 'react';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import tw, { css } from 'twin.macro';
import { Icon } from '@iconify/react';

export function IsLoading() {
  const isLoading = useIsFetching();
  const isMutating = useIsMutating();

  const style = {
    default: css([
      tw` text-[4rem] absolute z-[2] w-screen h-screen flex items-center justify-center bg-white `,
      (isLoading || isMutating) ? tw` block ` : tw` hidden `,
      tw` [>svg]:( animate-spin-2 ) `,
    ]),
  };

  return (
    <>
      <div css={style.default}>
        <Icon icon='mingcute:loading-fill' />
      </div>
    </>
  );
}
