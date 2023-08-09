import { User } from '@prisma/client';
import { useGetAll, useGetById, usePatch } from './template';
import { queryKeys } from '@/data/query-key.data';
import { IUpdateUserByAdminDto, IUpdateUserDto, IUpdateUserPasswordDto } from '@/types/dto.types';

export const useUsers = () => useGetAll<User[]>({
  key: queryKeys.users.all,
  api: '/users',
});

export const useUserById = (id: number) => useGetById<User>({
  key: queryKeys.users.byId(id),
  api: `/users/${id}}`,
});

export const useUpdateUser = (id: number) => usePatch<User, IUpdateUserDto>({
  api: `/users/${id}`,
});

export const useUpdateUserByAdmin = (id: number) => usePatch<User, IUpdateUserByAdminDto>({
  api: `/users/${id}/admin`,
});

export const useUpdatePassword = (id: number) => usePatch<User, IUpdateUserPasswordDto>({
  api: `/users/${id}/password`,
});
