import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../api/search";

export const useGetSearchContent = (searchTerm: string) => {
  return useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchUsers(searchTerm),
  });
};
