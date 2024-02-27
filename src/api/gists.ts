import { LoaderFunctionArgs } from "react-router-dom";
import { baseApi } from "./base";

export function getPublicGists(args: LoaderFunctionArgs<unknown>) {
  const {
    request: { signal },
  } = args;
  // eslint-disable-next-line no-unused-vars
  // const params = {
  //   page: 1,
  // };

  return baseApi
    .get(``, {
      // params,
      signal,
      headers: {
        Authorization: import.meta.env.VITE_BEARER_TOKEN,
      },
    })
    .then((res) => res.data);
}
