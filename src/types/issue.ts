export type UserInfo = {
  login: string;
  id: number;
  avatar_url: string;
};
export type IssuesItem = {
  id: number;
  html_url: string;
  labels_url: string;
  number: number;
  title: string;
  body: string;
  user: UserInfo;
};

export type IssueListResponse = IssuesItem[];
