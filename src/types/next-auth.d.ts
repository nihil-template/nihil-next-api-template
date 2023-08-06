import { UserRole, UserStatus } from '@prisma/client';
// eslint-disable-next-line no-unused-vars
import NextAuth from 'next-auth';
// eslint-disable-next-line no-unused-vars
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      id: number;
      email: string;
      userName: string;
      role: UserRole;
      status: UserStatus;
      created: Date;
      updated: Date;
      accessToken?: string;
      accessExp?: number;
      refreshToken?: string;
      refreshExp?: number;
    }
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line no-unused-vars
  interface JWT {
    user: {
      id: number;
      email: string;
      userName: string;
      role: UserRole;
      status: UserStatus;
      created: Date;
      updated: Date;
      accessToken?: string;
      accessExp?: number;
      refreshToken?: string;
      refreshExp?: number;
    },
  }
}
