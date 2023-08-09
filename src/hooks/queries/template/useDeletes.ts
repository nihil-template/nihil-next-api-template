import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IMutationParameter, IMutationType } from '@/types/queries.types';
import { apiDeletes } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const useDeletes = <T, P, E = IResError>(input: IMutationParameter): IMutationType<T, P, E> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError<E>, P>(
    async (deleteData) => {
      const { data, } = await apiDeletes<T, P>(
        input.api,
        deleteData,
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
