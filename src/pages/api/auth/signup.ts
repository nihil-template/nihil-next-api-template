import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '@prisma/client';
import { IRes, IResError } from '@/types/api.types';
import { ISignUpDto } from '@/types/dto.types';
import { prisma } from '@/utils/prisma';
import { hashData } from '@/utils/bcrypt';

interface NextApiRequestWithMethod extends NextApiRequest {
  method: ('GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS');
}

export default async function handler(
  req: NextApiRequestWithMethod,
  res: NextApiResponse
) {
  const { method, body, } = req;

  switch (method) {
    case 'POST': {
      const { email, password, userName, } = body as ISignUpDto;

      const emailCheck = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      const userNameCheck = await prisma.user.findUnique({
        where: {
          userName,
        },
      });

      if (emailCheck && userNameCheck) {
        const resData: IResError = {
          status: 400,
          message: [
            '이미 사용중인 이메일 입니다.',
            '이미 사용중인 별명입니다.',
          ],
        };

        return res.status(resData.status).json(resData);
      }

      if (emailCheck) {
        const resData: IResError = {
          status: 400,
          message: [
            '이미 사용중인 이메일 입니다.',
          ],
        };

        return res.status(resData.status).json(resData);
      }

      if (userNameCheck) {
        const resData: IResError = {
          status: 400,
          message: [
            '이미 사용중인 별명입니다.',
          ],
        };

        return res.status(resData.status).json(resData);
      }

      const hashedPassword = await hashData(password);

      const user = await prisma.user.create({
        data: {
          email,
          userName,
        },
      });

      await prisma.userAuth.create({
        data: {
          userId: user.id,
          hashedPassword,
          refreshToken: null,
        },
      });

      const resData: IRes<User> = {
        status: 201,
        message: '회원가입이 완료되었습니다.',
        body: user,
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
