import { NextApiRequest, NextApiResponse } from 'next';
import { IResError } from '@/types/api.types';
import { getUserByToken } from '@/utils/api';
import { prisma } from '@/utils/prisma';

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
      const accessToken = headers.authorization
        ? headers.authorization.replace('Bearer ', '')
        : null;

      const user = await getUserByToken(accessToken);

      if (!user) {
        await prisma.userAuth.update({
          where: {
            userId: user.id,
          },
          data: {
            refreshToken: null,
          },
        });

        const resData: IResError = {
          statusCode: 401,
          message: '인증되지 않은 사용자입니다.',
        };

        return res.status(resData.statusCode).json(resData);
      } else {
        await prisma.userAuth.update({
          where: {
            userId: user.id,
          },
          data: {
            refreshToken: null,
          },
        });

        return res.status(200).json({
          message: 'ok',
        });
      }
    }
    default: {
      res.setHeader('Allowed', [ 'POST', ]);
      const resData: IResError = {
        statusCode: 405,
        message: [
          `[ ${method} ] 요청이 허용되지 않았습니다.`,
        ],
      };
      res.status(resData.statusCode).json(resData);
      break;
    }
  }
}
