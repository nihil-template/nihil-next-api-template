import { NextApiRequest, NextApiResponse } from 'next';
import { ITokens, IResError } from '@/types/api.types';
import { ISignInDto } from '@/types/dto.types';
import { prisma } from '@/utils/prisma';
import { compareData } from '@/utils/bcrypt';
import { createToken, verifyToken } from '@/utils/jwt';

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
      const { email, password, } = body as ISignInDto;

      const user = await prisma.user.findUnique({
        where: {
          email,
          NOT: {
            status: 'withdrawal',
          },
        },
      });

      if (!user) {
        const resData: IResError = {
          statusCode: 401,
          message: '존재하지 않는 사용자 계정입니다.',
        };

        return res.status(resData.statusCode).json(resData);
      }

      const userAuth = await prisma.userAuth.findUnique({
        where: {
          userId: user.id,
        },
      });

      const passwordValid = await compareData(password, userAuth.hashedPassword);

      if (!passwordValid) {
        const resData: IResError = {
          statusCode: 401,
          message: '비밀번호가 일치하지 않습니다.',
        };

        return res.status(resData.statusCode).json(resData);
      }

      const accessToken = createToken(
        {
          sub: user.id,
          email: user.email,
          userName: user.userName,
          role: user.role,
        },
        process.env.ACCESS_SECRET,
        '1h'
      );

      const tokenInfo = verifyToken(accessToken, process.env.ACCESS_SECRET);

      const refreshToken = createToken(
        {
          sub: user.id,
          email: user.email,
          userName: user.userName,
          role: user.role,
        },
        process.env.REFRESH_SECRET,
        '7d'
      );

      const refreshInfo = verifyToken(refreshToken, process.env.REFRESH_SECRET);

      const tokens: ITokens = {
        accessToken,
        accessExp: tokenInfo.exp,
        refreshToken,
        refreshExp: refreshInfo.exp,
      };

      await prisma.userAuth.update({
        where: {
          userId: user.id,
        },
        data: {
          refreshToken,
        },
      });

      const userWithToken = {
        user,
        tokens,
      };

      return res.status(200).json(userWithToken);
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
