export interface ISiteData {
  title: string;
  description: string;
  url: string;
  type: string;
  image: string;
  keywords: string;
  author: string;
  version: string;
}

export interface IMetaData {
  title: string;
  url?: string;
  description?: string;
  author?: string;
  keywords?: string;
  type?: string;
  tags?: string;
  section?: string;
  created?: string;
  updated?: string;
  image?: string;
}

export interface IAppLayoutProps extends IMetaData {
  children: React.ReactNode;
}
