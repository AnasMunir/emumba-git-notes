export enum ACTIONS {
  LOGIN = "LOGIN",
  SET_USER = "SET_USER",
  SET_DISPLAY_FORMAT = "SET_DISPLAY_FORMAT",
  LOGOUT = "LOGOUT",
}

export type TFormat = "cards" | "list";
export type TState = {
  login?: string;
  node_id?: string;
  avatar_url?: string;
  url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
  repos_url?: string;
  html_url?: string;
  accessToken?: string | undefined;
  id?: number | null;
  public_gists?: number | null;
  followers?: number | null;
  following?: number | null;
  displayFormat?: TFormat;
  localLogin?: (accessToken: string) => void;
  setUserInfo?: (payload: TState) => void;
  logout?: () => void;
  setDisplayFormat?: (displayFormat: TFormat) => void;
};
export type TSearchResults = {
  total_count: number;
  incomplete_results: boolean;
  items: {
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
    score: number;
  }[];
};
