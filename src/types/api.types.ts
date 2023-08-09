import { User } from '@prisma/client';

export interface IResError {
  message: string | string[];
  error?: string;
  statusCode: number;
}

export interface ITokens {
  accessToken: string;
  accessExp: number;
  refreshToken?: string;
  refreshExp?: number;
}

export interface IUserWithTokens {
  user: User;
  tokens: ITokens;
}
