import { GithubPageResponse } from './common';

export type OwnerData = {
  login: string;
  id: number;
  avatar_url: string;
};

export type RepositoryItem = {
  id: number;
  name: string;
  full_name: string;
  owner: OwnerData;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  open_issues: number;
  issues_url: string;
};

export type RepositoryPageResponse = GithubPageResponse<RepositoryItem>;

export type RepositoryListRequestParams = {
  q: string;
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
};

export type FavoriteRepository = {
  id: number;
  name: string;
  fullName: string;
};
