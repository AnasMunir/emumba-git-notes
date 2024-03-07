import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../api/search";
import "./styles.css";
import Loader from "../Loader/Loader";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

function SearchList({ searchTerm, searchItemClicked }: { searchTerm: string; searchItemClicked: () => void }) {
  const { isLoading, data } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => searchUsers(searchTerm),
  });
  return (
    <>
      {searchTerm && (
        <>
          {isLoading ? (
            <div className='search-list'>
              <Loader />
            </div>
          ) : (
            data?.items.map((item) => (
              <div className='search-list' key={item.id} onClick={searchItemClicked}>
                <Avatar src={item.avatar_url} alt={item.login} />
                <Link to={`/${item.login}`}>{item.login}</Link>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
}

export default SearchList;
