import { UserRole, UserStatus } from '@prisma/client';

export interface ISignUpDto {
  email: string;
  userName: string;
  password: string;
}

export interface ISignInDto {
  email: string;
  password: string;
}

export interface IUpdateUserDto {
  userName?: string;
}

export interface IUpdateUserByAdminDto {
  role?: UserRole;
  status?: UserStatus;
}

export interface IUpdateUserPasswordDto {
  password: string;
}

export interface ICreateWithdrawalDto {
  userId: number;
  text?: string;
}
