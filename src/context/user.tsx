import { ReactNode, createContext, useEffect, useReducer } from "react";
import { ACTIONS, TFormat, TState } from "../types";

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
  displayFormat: "cards",
  localLogin: undefined,
  setUserInfo: undefined,
  logout: undefined,
  setDisplayFormat: undefined,
};

export const UserContext = createContext<TState>(initialState);

function reducer(state: TState, { type, payload }: { type: ACTIONS; payload?: TState }) {
  switch (type) {
    case ACTIONS.LOGIN:
      return { ...state, accessToken: payload?.accessToken };
    case ACTIONS.SET_USER:
      return { ...state, ...payload };
    case ACTIONS.SET_DISPLAY_FORMAT:
      return { ...state, displayFormat: payload?.displayFormat };
    case ACTIONS.LOGOUT:
      return { ...initialState };
    default:
      throw new Error("yo");
  }
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, (state: TState) => {
    return {
      ...state,
      accessToken: localStorage.getItem("ACCESS_TOKEN") || state.accessToken,
      displayFormat: (localStorage.getItem("DISPLAY_FORMAT") as TFormat) || state.displayFormat,
    };
  });

  function localLogin(accessToken: string) {
    if (accessToken === "") return;
    dispatch({ type: ACTIONS.LOGIN, payload: { accessToken } });
  }

  function setUserInfo(payload: TState) {
    dispatch({ type: ACTIONS.SET_USER, payload });
  }

  function logout() {
    dispatch({ type: ACTIONS.LOGOUT });
  }

  function setDisplayFormat(displayFormat: TFormat) {
    dispatch({ type: ACTIONS.SET_DISPLAY_FORMAT, payload: { displayFormat } });
  }

  useEffect(() => {
    if (state.accessToken !== undefined) {
      localStorage.setItem("ACCESS_TOKEN", state.accessToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  }, [state.accessToken]);

  useEffect(() => {
    if (state.displayFormat !== undefined) {
      localStorage.setItem("DISPLAY_FORMAT", state.displayFormat);
    } else {
      localStorage.removeItem("DISPLAY_FORMAT");
    }
  }, [state.displayFormat]);

  return (
    <UserContext.Provider
      value={{
        ...state,
        localLogin,
        setUserInfo,
        logout,
        setDisplayFormat,
      }}>
      {children}
    </UserContext.Provider>
  );
}
