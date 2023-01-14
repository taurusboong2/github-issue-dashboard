import { api } from '@/commons/githubApi';
import { RepositoryPageResponse, RepositoryListRequestParams } from '@/types/repository';

export const fetchRepositories = async (params: RepositoryListRequestParams) => {
  const response = await api.get<RepositoryPageResponse>(`/search/repositories`, { params });
  return response;
};
