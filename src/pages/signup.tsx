import React, { useState } from 'react';
import tw, { css } from 'twin.macro';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AppLayout } from '@/layouts';
import { useSignUp } from '@/hooks/queries';

interface Inputs {
  email: string;
  userName: string;
  password: string;
  passwordConfirm: string;
}

export default function SignUpPage() {
  const [ emailError, setEmailError, ] = useState(false);
  const [ emailErrorMessage, setemailErrorMessage, ] = useState('');
  const [ userNameError, setUserNameError, ] = useState(false);
  const [ userNameErrorMessage, setuserNameErrorMessage, ] = useState('');

  const router = useRouter();

  const signUp = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, },
  } = useForm<Inputs>({
    mode: 'onChange',
  });

  const onSubmitForm: SubmitHandler<Inputs> = (data) => {
    signUp.mutate({
      email: data.email,
      userName: data.userName,
      password: data.password,
    }, {
      onSuccess(result) {
        console.log('result >> ', result);
        router.push('/signup?isDone=true');
      },
      onError(error) {
        if (error.response.data.email) {
          setEmailError(true);
          setemailErrorMessage(error.response.data.email);
        }

        if (error.response.data.userName) {
          setUserNameError(true);
          setuserNameErrorMessage(error.response.data.userName);
        }
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

  console.log(watch('email'));
  console.log(router);

  return (
    <>
      <AppLayout title='회원가입'>
        <div css={style.default}>
          {router.query.isDone && (
            <>
              <h2>회원가입이 완료되었습니다.</h2>
              <Link href='/signin'>로그인하기</Link>
            </>
          )}
          {!router.query.isDone && (
            <form onSubmit={handleSubmit(onSubmitForm)}>
              <input
                type='email'
                placeholder='이메일을 입력하세요.'
                {...register('email', {
                  required: '이메일은 필수로 입력해야합니다.',
                  pattern: {
                    value: /([a-zA-Z0-9_])@([a-z].[a-z])/,
                    message: '올바른 이메일 형식을 입력해주세요.',
                  },
                })}
                css={style.input}
              />
              {errors.email && (<p>{errors.email.message}</p>)}
              {emailError && (<p>{emailErrorMessage}</p>)}
              <input
                type='text'
                placeholder='별명'
                {...register('userName', {
                  required: '별명은 필수로 입력해야합니다.',
                  pattern: {
                    value: /[a-zA-Z0-9가-힣]{4,20}/,
                    message: '별명은 특수문자를 제외한 4~20 글자여야합니다.',
                  },
                })}
                css={style.input}
              />
              {errors.userName && (<p>{errors.userName.message}</p>)}
              {userNameError && (<p>{userNameErrorMessage}</p>)}
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
              <input
                type='password'
                autoComplete='off'
                placeholder='비밀번호 확인'
                {...register('passwordConfirm', {
                  required: '비밀번호 확인은 필수로 입력해야합니다.',
                  pattern: {
                    value: /^(?=.*\d)(?=.*[a-zA-Z]).{8,20}$/,
                    message: '비밀번호는 8~20 자리의 숫자+영어알파벳(대/소)으로 구성되어야합니다.',
                  },
                  validate: (value, formValues) => {
                    return value === formValues.password || '입력한 비밀번호와 일치하지 않습니다.';
                  },
                })}
                css={style.input}
              />
              {errors.passwordConfirm && (<p>{errors.passwordConfirm.message}</p>)}
              <button css={style.button}>회원가입</button>
            </form>
          )}
        </div>
      </AppLayout>
    </>
  );
}
