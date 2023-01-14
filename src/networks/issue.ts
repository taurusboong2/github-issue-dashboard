import { api } from '@/commons/githubApi';
import { IssueListResponse } from '@/types/issue';

export const fetchIssues = async (repositoryName: string) => {
  const response = await api.get<IssueListResponse>(`/repos/${repositoryName}/issues`);
  return response;
};
