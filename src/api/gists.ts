import { LoaderFunctionArgs } from "react-router-dom";
import { baseApi } from "./base";

export function getPublicGists(args: LoaderFunctionArgs<unknown>) {
  const {
    request: { signal },
  } = args;
  const params = {
    page: 100,
  };

  return baseApi
    .get(`public`, {
      params,
      signal,
      headers: {
        Authorization: import.meta.env.VITE_BEARER_TOKEN,
      },
    })
    .then((res) => res.data);
}
