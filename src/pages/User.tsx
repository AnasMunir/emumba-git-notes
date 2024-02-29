import { TGist, getUserGists } from "../api/gists";
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";
import Card from "../components/Card";

function User() {
  const userGists = useLoaderData() as TGist[];
  const { userLogin } = useParams();
  const userData = userGists[0].owner;
  return (
    <div style={{ display: "flex" }}>
      <div>
        <img src={userData.avatar_url} alt={userLogin} height={260} width={260} style={{ borderRadius: "50%" }} />
      </div>
      <div>
        {userGists.map((gist) => (
          <Card
            url={gist.files[Object.keys(gist.files)[0]].raw_url}
            content={gist.files[Object.keys(gist.files)[0]].content}
            gistId={gist.id}
            userLogin={gist.owner.login}
          />
        ))}
      </div>
    </div>
  );
}

function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  return getUserGists(params.userLogin!, signal);
}
export const userRoute = {
  element: <User />,
  loader,
};
