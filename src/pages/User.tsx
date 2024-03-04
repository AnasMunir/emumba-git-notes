import { TGist, getUserGists } from "../api/gists";
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card";
import Paginator from "../components/Paginator";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Avatar from "../components/Avatar";

function User() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  const { userLogin } = useParams();
  const userData = gists[0].owner;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Avatar src={userData.avatar_url} alt={userLogin!} size='large' />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {gists.map((gist) => (
          <Card
            key={gist.id}
            url={gist.files[Object.keys(gist.files)[0]].raw_url}
            content={gist.files[Object.keys(gist.files)[0]].content}
            gistId={gist.id}
            userLogin={gist.owner.login}
            showUserLink={false}
          />
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
