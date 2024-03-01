import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { createContext, useEffect, useReducer } from "react";

export enum ACTIONS {
  LOGIN = "LOGIN",
  SET_USER = "SET_USER",
  LOGOUT = "LOGOUT",
}

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
  localLogin?: (accessToken: string) => void;
  setUserInfo?: (payload: TState) => void;
};
const initialState: TState = {
  login: "",
  id: null,
  node_id: "",
  avatar_url: "",
  url: "",
  followers_url: "",
  following_url: "",
  gists_url: "",
  starred_url: "",
  email: "",
  public_gists: null,
  followers: null,
  following: null,
  created_at: "",
  updated_at: "",
  repos_url: "",
  html_url: "",
  accessToken: undefined,
  localLogin: undefined,
  setUserInfo: undefined,
};

export const AuthContext = createContext<TState>(initialState);
// export const AuthDispatchContext = createContext<TState>(initialState);

function reducer(state: TState, { type, payload }: { type: ACTIONS; payload: TState }) {
  switch (type) {
    case ACTIONS.LOGIN:
      return { ...state, accessToken: payload?.accessToken };
    case ACTIONS.SET_USER:
      return { ...state, ...payload };
    default:
      throw new Error("yo");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState, (state) => {
    return {
      ...state,
      accessToken: localStorage.getItem("ACCESS_TOKEN") || state.accessToken,
    };
  });

  function localLogin(accessToken: string) {
    if (accessToken === "") return;
    dispatch({ type: ACTIONS.LOGIN, payload: { accessToken } });
  }

  function setUserInfo(payload: TState) {
    dispatch({ type: ACTIONS.SET_USER, payload });
  }

  useEffect(() => {
    if (state.accessToken !== undefined) {
      localStorage.setItem("ACCESS_TOKEN", state.accessToken);
    }
  }, [state.accessToken]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        localLogin,
        setUserInfo,
      }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
