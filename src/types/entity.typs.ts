import { UserRole, UserStatus } from '@prisma/client';

export interface IUserWithToken {
  id: number;
  userName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  created: Date;
  updated: Date;
  accessToken?: string;
  accessExp?: number;
  refreshToken?: string;
  refreshExp?: number;
}
