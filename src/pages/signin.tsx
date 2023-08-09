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
              {...register('email', {
                pattern: /([a-zA-Z0-9_])@([a-z].[a-z])/,
                required: true,
              })}
              css={style.input}
            />
            {errors.email && (<p>이메일을 올바르게 입력해주세요.</p>)}
            <input
              type='password'
              autoComplete='off'
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
              css={style.input}
            />
            {errors.password && (<p>비밀번호는 8~20자입니다.</p>)}
            <button css={style.button}>로그인</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
