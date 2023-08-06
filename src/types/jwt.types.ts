import { UserRole } from '@prisma/client';

export interface IPayload {
  sub: number;
  userName: string;
  email: string;
  role: UserRole;
}
