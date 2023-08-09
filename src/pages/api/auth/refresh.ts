import { NextApiRequest, NextApiResponse } from 'next';
import { ITokens, IResError } from '@/types/api.types';
import { prisma } from '@/utils/prisma';
import { createToken, verifyToken } from '@/utils/jwt';
import { getUserByToken } from '@/utils/api';

interface NextApiRequestWithMethod extends NextApiRequest {
  method: ('GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS');
}

export default async function handler(
  req: NextApiRequestWithMethod,
  res: NextApiResponse
) {
  const { method, headers, } = req;

  switch (method) {
    case 'POST': {
      const refreshToken = headers.authorization
        ? headers.authorization.replace('Bearer ', '')
        : null;

      const user = await getUserByToken(refreshToken);

      if (!user) {
        const resData: IResError = {
          statusCode: 401,
          message: '인증되지 않은 사용자입니다.',
        };

        return res.status(resData.statusCode).json(resData);
      }

      const userAuth = await prisma.userAuth.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (userAuth.refreshToken !== refreshToken) {
        const resData: IResError = {
          statusCode: 401,
          message: '인증 정보가 일치하지 않습니다.',
        };

        return res.status(resData.statusCode).json(resData);
      }

      const refreshInfo = verifyToken(refreshToken, process.env.REFRESH_SECRET);

      const nowDate = Date.now();
      const expDate = refreshInfo.exp * 1000;
      const diff = Math.round((expDate - nowDate) / 1000);

      if (diff <= 0) {
        const resData: IResError = {
          statusCode: 401,
          message: '리프레시 토큰이 만료되었습니다.',
        };

        return res.status(resData.statusCode).json(resData);
      }

      const accessToken = createToken(
        {
          sub: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_SECRET,
        '1h'
      );

      const tokenInfo = verifyToken(accessToken, process.env.ACCESS_SECRET);

      const newRefreshToken = createToken(
        {
          sub: user.id,
          userName: user.userName,
          email: user.email,
          role: user.role,
        },
        process.env.ACCESS_SECRET,
        '7d'
      );

      const newRefreshInfo = verifyToken(
        newRefreshToken,
        process.env.REFRESH_SECRET
      );

      const tokens: ITokens = {
        accessToken,
        accessExp: tokenInfo.exp,
        refreshToken: newRefreshToken,
        refreshExp: newRefreshInfo.exp,
      };

      return res.status(200).json({
        user,
        tokens,
      });
    }
    default: {
      res.setHeader('Allowed', [ 'POST', ]);
      const resData: IResError = {
        statusCode: 405,
        message: [
          `[ ${method} ] 요청이 허용되지 않았습니다.`,
        ],
      };
      return res.status(resData.statusCode).json(resData);
    }
  }
}
