import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { IQueryParameter, IQueryType } from '@/types/queries.types';
import { apiGet } from '@/utils/axios';
import { IResError } from '@/types/api.types';

export const useGetById = <T>(input: IQueryParameter<T>):IQueryType<T> => {
  const {
    data = null, isLoading, isError, error, isSuccess, refetch,
  } = useQuery<T, AxiosError<IResError>>(
    input.key,
    async () => {
      const { data, } = await apiGet<T>(input.api, input.config);

      return data;
    },
    {
      ...input.options,
    }
  );

  return {
    data: data as T,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  };
};
