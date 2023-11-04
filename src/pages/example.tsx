import React from 'react';
import tw, { css } from 'twin.macro';
import { Icon } from '@iconify/react';
import { useGetBoardsQuery } from '../apis/example.api';
import { Nihil } from '../utils/nihil';
import { AppLayout } from '../layouts';

export default function ExamplePage() {
  const boards = useGetBoardsQuery(null, {
    pollingInterval: 600 * 1000,
  });

  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='예시'>
        <div css={style.default}>
          {(boards.isFetching || boards.isLoading) && (
            <Icon icon='uil:spinner-alt' tw='animate-spin' />
          )}
          {boards.isSuccess && boards.data.map((item) => (
            <div key={Nihil.uuid(item.id)}>
              <h2 tw='text-[1.5rem] font-900 text-black-base'>{item.title}</h2>
              <p tw='text-[1rem] text-black-base'>{item.content}</p>
            </div>
          ))}
        </div>
      </AppLayout>
    </>
  );
}
