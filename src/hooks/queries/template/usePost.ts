import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { IMutationParameter, IMutationType } from '@/types/queries.types';
import { apiPost } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const usePost = <T, P>(input: IMutationParameter): IMutationType<T, P> => {
  const {
    mutate, isLoading, isError, error, isSuccess,
  } = useMutation<T, AxiosError<IResError>, P>(
    async (postData) => {
      const { data, } = await apiPost<T, P>(
        input.api,
        postData,
        input.config,
        input.multiPart
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
