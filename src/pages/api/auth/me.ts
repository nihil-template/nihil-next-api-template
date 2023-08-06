import { NextApiRequest, NextApiResponse } from 'next';
import { IResError } from '@/types/api.types';
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
    case 'GET': {
      const accessToken = headers.authorization
        ? headers.authorization.replace('Bearer ', '')
        : null;

      const user = await getUserByToken(accessToken);

      if (!user) {
        const resData: IResError = {
          status: 401,
          message: '인증되지 않은 사용자입니다.',
        };

        return res.status(resData.status).json(resData);
      } else {
        return res.status(200).json(user);
      }
    }
    default: {
      res.setHeader('Allowed', [ 'GET', ]);
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