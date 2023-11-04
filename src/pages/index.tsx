import React, { useCallback } from 'react';
import tw, { css } from 'twin.macro';
import { AppLayout } from '@/src/layouts';
import { useAppDispatch, useAppSelector } from '@/src/hooks/rtk';
import { setWord } from '../reducers/example.reducer';

export default function IndexPage() {
  const word = useAppSelector((state) => state.example.word);
  const dispatch = useAppDispatch();

  const onClickText = useCallback(
    () => {
      dispatch(setWord(word === 'JavaScript' ? 'TypeScript' : 'JavaScript'));
    },
    [ word, ]
  );

  const style = {
    default: css([
      tw` py-4 `,
      tw` [>h2]:( p-3 bg-black-700 text-white font-900 text-center text-[2rem] ) `,
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
          <h2>{word}</h2>
          <button onClick={onClickText} css={style.button}>클릭</button>
        </div>
      </AppLayout>
    </>
  );
}
