import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IMutationParameter, IMutationType } from '@/types/queries.types';
import { apiPatch } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const usePatch = <T, P>(input: IMutationParameter): IMutationType<T, P> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError<IResError>, P>(
    async (updateData) => {
      const { data, } = await apiPatch<T, P>(
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
