import { TGist, getUserGists } from "../api/gists";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card/Card";
import Paginator from "../components/Paginator";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Avatar from "../components/Avatar";

function User() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  const { userLogin } = useParams();
  const userData = gists[0].owner;
  return (
    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
      <Avatar src={userData.avatar_url} alt={userLogin!} size='large' />
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {gists.map((gist) => (
          <div style={{ padding: "10px" }} key={gist.id}>
            <Card gist={gist} showUserLink={true} />
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
