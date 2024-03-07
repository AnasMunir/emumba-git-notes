import Loader from "../Loader/Loader";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";
import { useGetSearchContent } from "../../hooks/useGetSearchContent";
import "./styles.css";

function SearchList({ searchTerm, searchItemClicked }: { searchTerm: string; searchItemClicked: () => void }) {
  const { isLoading, data } = useGetSearchContent(searchTerm);
  return (
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
  );
}

export default SearchList;
