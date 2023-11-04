import { NextApiRequest, NextApiResponse } from 'next';
import { IResError } from '@/src/types/api.types';

interface IResData {
  text: string;
}

interface NextApiRequestWithMethod extends NextApiRequest {
  method: ('GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS');
}

export default async function handler(
  req: NextApiRequestWithMethod,
  res: NextApiResponse
) {
  const { method, } = req;

  switch (method) {
    case 'GET': {
      const resData: IResData = {
        text: 'Hello World!!',
      };

      res.status(200).json(resData);
      break;
    }
    default: {
      res.setHeader('Allowed', [ 'GET', ]);
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
