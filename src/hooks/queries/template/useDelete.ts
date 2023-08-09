import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IMutationParameter, IMutationType } from '@/types/queries.types';
import { apiDelete } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const useDelete = <T, P, E = IResError>(input: IMutationParameter): IMutationType<T, P, E> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError<E>, P>(
    async () => {
      const { data, } = await apiDelete<T>(input.api, input.config);

      return data;
    }
  );

  return {
    mutate,
    isLoading,
    isError,
    error,
    isSuccess,
  };
};
