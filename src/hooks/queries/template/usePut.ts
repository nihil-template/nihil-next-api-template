import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IMutationParameter, IMutationType } from '@/types/queries.types';
import { apiPut } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const usePut = <T, P, E = IResError>(input: IMutationParameter): IMutationType<T, P, E> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError<E>, P>(
    async (updateData) => {
      const { data, } = await apiPut<T, P>(
        input.api,
        updateData,
        input.config
      );

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
