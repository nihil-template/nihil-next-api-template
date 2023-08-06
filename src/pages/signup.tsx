import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import tw, { css } from 'twin.macro';
import { useRouter } from 'next/router';
import { AppLayout } from '@/layouts';
import { useSignUp } from '@/hooks/queries/auth';

interface Inputs {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpPage() {
  const [ passwordError, setPasswordError, ] = useState(false);
  const signUp = useSignUp();
  const router = useRouter();

  const {
    register, handleSubmit, watch, formState: { errors, },
  } = useForm<Inputs>({ mode: 'onChange', });

  useEffect(() => {
    const password = watch('password');
    const passwordConfirm = watch('passwordConfirm');

    if (password !== passwordConfirm) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, []);

  const style = {
    default: css([
      tw`  `,
    ]),
  };

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    signUp.mutate({
      email: data.email,
      userName: data.userName,
      password: data.password,
    }, {
      onSuccess(result) {
        console.log('result >> ', result);
        router.push('/');
      },
    });
  };

  return (
    <>
      <AppLayout title='회원가입'>
        <div css={style.default}>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <input
              type='email'
              placeholder='이메일'
              {...register('email', {
                required: true,
                pattern: /(\S+)@(\S+\.\S+)/gm,
              })}
            />
            {errors.email && <p>이메일 형식이 아닙니다.</p>}
            <input
              type='text'
              placeholder='별명'
              {...register('userName', {
                required: true,
              })}
            />
            <input
              type='password'
              placeholder='비밀번호 8~20자'
              autoComplete='off'
              {...register('password', {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
            {passwordError && <p>비밀번호가 일치하지 않습니다.</p>}
            <input
              type='password'
              placeholder='비밀번호 확인 8~20자'
              autoComplete='off'
              {...register('passwordConfirm', {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
            />
            {passwordError && <p>비밀번호가 일치하지 않습니다.</p>}
            <button>회원가입</button>
          </form>
        </div>
      </AppLayout>
    </>
  );
}
