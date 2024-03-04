import { getAccessToken } from "../utils/getAccessToken";
import { TPaginationLinks, parseLinkHeader } from "../utils/parseLinkHeaders";
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
      content?: string;
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
    login: string;
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

function authHeaders() {
  if (getAccessToken()) {
    return {
      Authorization: getAccessToken(),
    };
  }
  return {};
}

export function getUserGists(
  userLogin: string,
  page: string | null,
  perPage: string | null,
  signal: AbortSignal
): Promise<{ gists: TGist[]; paginationLinks: TPaginationLinks }> {
  const params = {
    page: page ? page : 1,
    per_page: perPage ? perPage : 10,
  };
  return baseApi
    .get(`/users/${userLogin}/gists`, {
      params,
      signal,
      headers: {
        ...authHeaders,
      },
    })
    .then((res) => {
      const paginationLinks = parseLinkHeader(res.headers["link"]);

      return { gists: res.data, paginationLinks };
    });
}

export function getPublicGists(
  signal: AbortSignal,
  page: string | null,
  perPage: string | null
): Promise<{ gists: TGist[]; paginationLinks: TPaginationLinks }> {
  const params = {
    page: page ? page : 1,
    per_page: perPage ? perPage : 10,
  };

  return baseApi
    .get("gists", {
      params,
      signal,
    })
    .then((res) => {
      const paginationLinks = parseLinkHeader(res.headers["link"]);

      return { gists: res.data, paginationLinks };
    });
}

export function getGist(gistId: string, signal: AbortSignal): Promise<TGist> {
  return baseApi
    .get(`gists/${gistId}`, {
      signal,
      headers: {
        ...authHeaders,
      },
    })
    .then((res) => res.data);
}

export function createGist({ data, options }: TCreateGist) {
  return baseApi
    .post("gists", data, {
      headers: { ...authHeaders, Accept: "application/vnd.github+json" },
      ...options,
    })
    .then((res) => res.data);
}

type TUpdateGist = {
  data?: { description: string; files: Record<string, { content: string }> };
  id: string;
  options: AbortSignal;
};

export function updateGist({ data, id, options }: TUpdateGist) {
  return baseApi
    .patch(`gists/${id}`, data, {
      headers: { ...authHeaders, Accept: "application/vnd.github+json" },
      ...options,
    })
    .then((res) => res.data);
}

export function deleteGist({ id, options }: TUpdateGist) {
  return baseApi
    .delete(`gists/${id}`, {
      headers: { ...authHeaders },
      ...options,
    })
    .then((res) => res.data);
}
