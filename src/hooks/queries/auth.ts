import { User } from '@prisma/client';
import { ISignInDto, ISignUpDto } from '@/types/dto.types';
import { useGetAny, usePost } from './template';
import { IUserWithTokens } from '@/types/api.types';
import { queryKeys } from '@/data/query-key.data';

type SignUpError = {
  email?: string;
  userName?: string;
};
export const useSignUp = () => usePost<User, ISignUpDto, SignUpError>({
  api: '/auth/signup',
});

export const useSignIn = () => usePost<IUserWithTokens, ISignInDto>({
  api: '/auth/signin',
});

export const useSignOut = (token: string) => (
  usePost<{message: string}, null>({
    api: '/auth/signout',
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
);

export const useMe = (token: string) => useGetAny<User>({
  key: queryKeys.auth.me,
  api: '/auth/me',
  config: {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  },
  options: {
    enabled: !!token,
  },
});

export const useRefresh = (refreshToken: string) => usePost<IUserWithTokens, null>({
  api: '/auth/refresh',
  config: {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  },
});

export const useWithdrawal = (token: string) => (
  usePost<void, null>({
    api: '/auth/withdrawal',
    config: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
);
