import axios from "axios";
import { TState } from "../App";

export function getToken(code: string): Promise<{
  access_token: string;
  token_type: string;
  scope: string;
}> {
  return axios.get(`http://localhost:3000/authenticate?code=${code}`).then((res) => res.data);
}

export function getUser(accessToken: string): Promise<TState> {
  return axios
    .get(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => res.data);
}
