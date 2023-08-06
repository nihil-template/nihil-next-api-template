import { NextApiRequest, NextApiResponse } from 'next';
import { IRefresh, IRes, IResError } from '@/types/api.types';
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
          status: 401,
          message: '인증되지 않은 사용자입니다.',
        };

        return res.status(resData.status).json(resData);
      }

      const userAuth = await prisma.userAuth.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (userAuth.refreshToken !== refreshToken) {
        const resData: IResError = {
          status: 401,
          message: '인증 정보가 일치하지 않습니다.',
        };

        return res.status(resData.status).json(resData);
      }

      const refreshInfo = verifyToken(refreshToken, process.env.REFRESH_SECRET);

      const nowDate = Date.now();
      const expDate = refreshInfo.exp * 1000;
      const diff = Math.round((expDate - nowDate) / 1000);

      if (diff <= 0) {
        const resData: IResError = {
          status: 401,
          message: '리프레시 토큰이 만료되었습니다.',
        };

        return res.status(resData.status).json(resData);
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

      const resData: IRes<IRefresh> = {
        status: 200,
        message: '액세스토큰이 재발급 되었습니다.',
        body: {
          accessToken,
          accessExp: tokenInfo.exp,
          refreshToken: newRefreshToken,
          refreshExp: newRefreshInfo.exp,
        },
      };

      return res.status(resData.status).json(resData);
    }
    default: {
      res.setHeader('Allowed', [ 'POST', ]);
      const data: IResError = {
        status: 405,
        message: [
          `[ ${method} ] 요청이 허용되지 않았습니다.`,
        ],
      };
      return res.status(405).json(data);
    }
  }
}
