import { User } from '@prisma/client';

export interface IResError {
  status: number;
  message: string | string[];
}

export interface IRes<Type> {
  status: number;
  message: string;
  body: Type;
}

export interface IRefresh {
  accessToken: string;
  accessExp: number;
  refreshToken?: string;
  refreshExp?: number;
}

export interface iSignInRes {
  user: User;
  tokens: IRefresh;
}
