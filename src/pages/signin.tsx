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
    register, handleSubmit, formState: { errors, },
  } = useForm<Inputs>({ mode: 'onChange', });

  const signIn = useSignIn();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn.mutate({
      ...data,
    }, {
      onSuccess(result) {
        dispatch(setUserInfo({
          userInfo: result.body,
        }));
        router.push('/');
      },
    });
  };

  const style = {
    default: css([
      tw`  `,
    ]),
  };

  return (
    <>
      <AppLayout title='로그인'>
        <div css={style.default}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type='email'
              placeholder='이메일'
              {...register('email', {
                required: true,
                pattern: /(\S+)@(\S+.\S+)/,
              })}
            />
            {errors.email && <p>이메일 형식이 아닙니다.</p>}
            <input
              type='password'
              placeholder='비밀번호 (8~20자)'
              autoComplete='off'
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
            {errors.password && <p>비밀번호는 8~20자의 숫자, 영어 알파벳의 조합입니다.</p>}
            <button>로그인</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
