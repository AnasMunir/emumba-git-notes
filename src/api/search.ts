import { TSearchResults } from "../types";
import { baseApi } from "./base";

export async function searchUsers(searchString: string): Promise<TSearchResults | null> {
  if (searchString) {
    const response = await baseApi.get(`/search/users?q=${searchString}+type:user`, {
      headers: {
        Accept: "application/vnd.github+json",
      },
    });
    return response.data;
  } else return null;
}
