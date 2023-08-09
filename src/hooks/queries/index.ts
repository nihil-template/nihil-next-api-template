import { useGetAny } from './template';

export const useHello = () => useGetAny<{ message: string }>({
  key: [ 'getHelloWorld', ],
  api: '/',
});

export * from './auth';
export * from './user';
