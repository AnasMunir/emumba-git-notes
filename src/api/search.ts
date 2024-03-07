import { baseApi } from "./base";

export async function searchUsers(searchString: string) {
  const response = await baseApi.get(`/search/users?q=${searchString}+type:user`, {
    headers: {
      Accept: "application/vnd.github+json",
    },
  });
  return response.data;
}
