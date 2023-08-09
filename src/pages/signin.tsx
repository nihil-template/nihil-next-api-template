import React from 'react';
import tw, { css } from 'twin.macro';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AppLayout } from '@/layouts';
import { useSignIn } from '@/hooks/queries/auth';
import { useAppDispatch } from '@/hooks/rtk';
import { setUserInfo } from '@/reducers/auth.reducer';

interface Inputs {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const signIn = useSignIn();

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    signIn.mutate({
      ...data,
    }, {
      onSuccess(response) {
        dispatch(setUserInfo({
          userInfo: response,
        }));

        router.push('/');
      },
    });
  };

  const style = {
    default: css([
      tw`  `,
    ]),
    input: css([
      tw` border border-black-200 block m-1 w-[250px] `,
    ]),
    button: css([
      tw` block border border-blue-500 bg-blue-500 text-white m-1 text-center w-[250px] `,
    ]),
  };

  return (
    <>
      <AppLayout title='로그인'>
        <div css={style.default}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <input
              type='email'
              placeholder='이메일'
              {...register('email', {
                required: '이메일을 입력하세요.',
                pattern: {
                  value: /([a-zA-Z0-9_])@([a-z].[a-z])/,
                  message: '올바른 이메일 형식을 입력해주세요.',
                },
              })}
              css={style.input}
            />
            {errors.email && (<p>{errors.email.message}</p>)}
            <input
              type='password'
              autoComplete='off'
              placeholder='비밀번호'
              {...register('password', {
                required: '비밀번호는 필수로 입력해야합니다.',
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/,
                  message: '비밀번호는 8~20 자리의 숫자+영어알파벳(대/소)으로 구성되어야합니다.',
                },
              })}
              css={style.input}
            />
            {errors.password && (<p>{errors.password.message}</p>)}
            <button css={style.button}>로그인</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
