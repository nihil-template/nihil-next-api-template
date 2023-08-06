import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/layouts';
import { changeWord } from '@/reducers/word.reducer';
import { useAppDispatch, useAppSelector } from '@/hooks/rtk';
import { useSession } from '@/hooks';

export default function IndexPage() {
  const text = useAppSelector((state) => state.word.text);
  const dispatch = useAppDispatch();

  const session = useSession();

  console.log('accessToken >> ', session?.tokens.accessToken);
  console.log('accessExp >> ', session?.tokens.accessExp);

  const onClickText = useCallback(
    () => {
      dispatch(changeWord());
    },
    []
  );

  const style = {
    default: css([
      tw` py-4 `,
    ]),
    word: css([
      tw` p-3 bg-black-700 text-white font-900 text-center text-[2rem] `,
    ]),
    button: css([
      tw` block w-full p-3 bg-blue-500 text-white text-[1.2rem] mt-5 transition-all duration-200 `,
      tw` hover:( bg-blue-600 ) `,
    ]),
  };

  return (
    <>
      <AppLayout title='홈'>
        <div css={style.default}>
          <h2 css={style.word}>{text}</h2>
          <button onClick={onClickText} css={style.button}>클릭</button>
        </div>
      </AppLayout>
    </>
  );
}
