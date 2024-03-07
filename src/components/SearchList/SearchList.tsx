import { useQuery } from "@tanstack/react-query";
import { searchUsers } from "../../api/search";
import "./styles.css";
import Loader from "../Loader/Loader";
import Avatar from "../Avatar";
import { Link } from "react-router-dom";

function SearchList({ searchTerm }: { searchTerm: string }) {
  console.log("searchTerm", searchTerm);
  const { isLoading, data } = useQuery({
    queryKey: ["search", searchTerm],
    queryFn: () => dummyApiCall(searchTerm),
  });
  console.log(isLoading);
  console.log(data);
  return (
    <>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src='https://avatars.githubusercontent.com/u/8572727?v=4' alt='A' />
        <Link to={`/AnasMunir`}>AnasMunir</Link>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src='https://avatars.githubusercontent.com/u/8572727?v=4' alt='A' />
        <Link to={`/AnasMunir`}>AnasMunir</Link>
      </div>
      {/* {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        data?.items.map((item) => (
          <div key={item.id} style={{display: "flex", alignItems: "center"}}>
            <Avatar src={item.avatar_url} alt={item.login} />
            <span>
              <p>
                <Link to={`/${item.login}`}>{item.login}</Link>
              </p>
            </span>
          </div>
        ))
      )} */}
    </>
  );
}

function dummyApiCall(searchTerm: string) {
  return new Promise((res) => res("dummy data " + searchTerm));
}

export default SearchList;
