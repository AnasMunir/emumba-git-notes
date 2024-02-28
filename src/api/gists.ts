import { LoaderFunctionArgs } from "react-router-dom";
import { baseApi } from "./base";

export type TGist = {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: {
    [filename: string]: {
      filename: string;
      type: string;
      language: string;
      raw_url: string;
      size: number;
    };
  };
  public: boolean;
  created_at: "2024-02-27T05:38:13Z";
  updated_at: "2024-02-27T05:38:13Z";
  description: "Another Gist for testing";
  comments: 0;
  user: null;
  comments_url: "https://api.github.com/gists/0c66c94594f0c6545de05b24be5e381e/comments";
  owner: {
    login: "AnasMunir";
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  truncated: boolean;
};

type TCreateGist = {
  data: { description: string; files: Record<string, { content: string }> };
  options: AbortSignal;
};

export function getPublicGists(args: LoaderFunctionArgs<unknown>): Promise<TGist[]> {
  const {
    request: { signal },
  } = args;
  // eslint-disable-next-line no-unused-vars
  const params = {
    page: 1,
    per_page: 10,
  };

  return baseApi
    .get(``, {
      params,
      signal,
      headers: {
        Authorization: import.meta.env.VITE_BEARER_TOKEN,
      },
    })
    .then((res) => res.data);
}

export function getGist(gistId: string, signal: AbortSignal) {
  return baseApi.get(`${gistId}`, { signal }).then((res) => res.data);
}

export function createGist({ data, options }: TCreateGist) {
  return baseApi
    .post("", data, {
      headers: { Authorization: import.meta.env.VITE_BEARER_TOKEN, Accept: "application/vnd.github+json" },
      ...options,
    })
    .then((res) => res.data);
}
