import { NextApiRequest, NextApiResponse } from 'next';
import { IResError } from '@/src/types/api.types';

interface IResData {
  statusCode: number;
  message: string[];
  data?: any;
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
      const boards = [
        {
          id: 0,
          userId: 1,
          title: '제목 1',
          content: '내용 1',
        },
        {
          id: 1,
          userId: 1,
          title: '제목 2',
          content: '내용 2',
        },
        {
          id: 2,
          userId: 1,
          title: '제목 3',
          content: '내용 3',
        },
        {
          id: 3,
          userId: 1,
          title: '제목 4',
          content: '내용 4',
        },
        {
          id: 4,
          userId: 1,
          title: '제목 5',
          content: '내용 5',
        },
        {
          id: 5,
          userId: 1,
          title: '제목 6',
          content: '내용 6',
        },
        {
          id: 6,
          userId: 1,
          title: '제목 7',
          content: '내용 7',
        },
        {
          id: 7,
          userId: 1,
          title: '제목 8',
          content: '내용 8',
        },
        {
          id: 8,
          userId: 1,
          title: '제목 9',
          content: '내용 9',
        },
        {
          id: 9,
          userId: 1,
          title: '제목 10',
          content: '내용 10',
        },
      ];

      const resData: IResData = {
        statusCode: 200,
        message: [],
        data: {
          boards,
        },
      };

      res.status(resData.statusCode).json(resData);
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
