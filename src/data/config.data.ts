import { ISiteData } from '@/src/types/site.types';

export const siteData: ISiteData = {
  title: '사이트 이름',
  description: '',
  keywords: '',
  author: 'NIHILncunia',
  type: 'website',
  url: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : '',
  image: '',
  version: 'v0.0.0',
};
