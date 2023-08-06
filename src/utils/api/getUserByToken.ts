import { verifyToken } from '../jwt';
import { prisma } from '../prisma';

export const getUserByToken = async (token: string) => {
  if (!token) {
    return null;
  }

  const tokenInfo = verifyToken(token, process.env.ACCESS_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: tokenInfo.sub,
    },
  });

  if (!user) {
    return null;
  }

  return user;
};
