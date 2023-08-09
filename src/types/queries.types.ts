import { AxiosError, AxiosRequestConfig } from 'axios';
import {
  QueryObserverResult, RefetchOptions, RefetchQueryFilters, UseMutateFunction, UseQueryOptions
} from '@tanstack/react-query';

export interface IQueryType<T, E> {
  data: T;
  error?: AxiosError<E>;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  isSuccess?: boolean;
  // eslint-disable-next-line no-unused-vars
  refetch?: <TPageData>(options?: RefetchOptions & RefetchQueryFilters<TPageData>) => Promise<QueryObserverResult<T, AxiosError<unknown, any>>>
}

export interface IMutationType<T, P, E> {
  mutate: UseMutateFunction<T, AxiosError<E>, P, unknown>;
  error?: AxiosError<E>;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

export type IQueryOptions<T> = UseQueryOptions<T>;

export interface IQueryParameter<T> {
  key: Array<string> | Array<string | number>;
  api: string;
  config?: AxiosRequestConfig;
  options?: IQueryOptions<T>
}

export interface IMutationParameter {
  api: string;
  config?: AxiosRequestConfig;
  multiPart?: 'multiPart';
}
