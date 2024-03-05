import { TGist, getUserGists } from "../api/gists";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import Paginator from "../components/Paginator";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Avatar from "../components/Avatar";
import GistInfo from "../components/GistInfo/GistInfo";

function User() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  const { userLogin } = useParams();
  const user = gists[0].owner;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "50px",
          borderRight: "1px solid gray",
        }}>
        <Avatar src={user.avatar_url} alt={userLogin!} size='large' />
        <p>{user.login}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden", padding: "50px" }}>
        {gists.map((gist) => (
          <div style={{ padding: "10px" }} key={gist.id}>
            <div style={{ margin: "15px 0px" }}>
              <GistInfo
                src={gist.owner.avatar_url}
                gistId={gist.id}
                username={gist.owner.login}
                filename={gist.files[Object.keys(gist.files)[0]].filename}
                createdAt={gist.created_at}
              />
            </div>
            <Card gist={gist} showUserLink={false} />
          </div>
        ))}
        <div style={{ marginTop: "10px" }}>
          <Paginator links={paginationLinks.links} />
        </div>
      </div>
    </div>
  );
}

function loader({ params, request: { signal, url } }: LoaderFunctionArgs) {
  const searchParams = new URL(url).searchParams;
  const page = searchParams.get("page");
  const perPage = searchParams.get("per_page");
  return getUserGists(params.userLogin!, page, perPage, signal);
}
export const userRoute = {
  element: <User />,
  loader,
};
