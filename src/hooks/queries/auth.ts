import { User } from '@prisma/client';
import { ISignInDto, ISignUpDto } from '@/types/dto.types';
import { useGetAny, usePost } from './template';
import { IRefresh, IRes, iSignInRes } from '@/types/api.types';
import { queryKeys } from '@/data/query-key.data';

export const useSignUp = () => usePost<IRes<User>, ISignUpDto>({
  api: '/auth/signup',
});

export const useSignIn = () => usePost<IRes<iSignInRes>, ISignInDto>({
  api: '/auth/signin',
});

export const useMe = (token: string = '') => useGetAny<User>({
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

export const useRefresh = (refreshToken: string) => usePost<IRes<IRefresh>, null>({
  api: '/auth/refresh',
  config: {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  },
});

export const useSignOut = (id: number, isClick: boolean) => useGetAny<void>({
  key: queryKeys.auth.signOut(id),
  api: '/auth/signout',
  options: {
    enabled: !!isClick,
  },
});

export const useWithdrawal = (id: number, isClick: boolean) => useGetAny<void>({
  key: queryKeys.auth.withdrawal(id),
  api: '/auth/withdrawal',
  options: {
    enabled: !!isClick,
  },
});
