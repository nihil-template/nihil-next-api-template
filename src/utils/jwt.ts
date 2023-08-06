import jwt from 'jsonwebtoken';
import { IPayload } from '@/types/jwt.types';

export const createToken = (payload: IPayload, secret: string, exp: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: exp,
  });
};

interface ITokenPayload extends IPayload {
  exp: number;
  iat: number;
}

export const verifyToken = (token: string, secret: string): ITokenPayload => {
  return jwt.verify(token, secret) as unknown as ITokenPayload;
};
