import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getPublicGists } from "../api/gists";
import Card from "../components/Card";

// TODO: create styles and sub components
function Gists() {
  const gists = useLoaderData() as TGist[];

  return (
    <div className='card-grid'>
      <Link className='btn btn-outline' to='new'>
        New
      </Link>
      {gists.map((gist) => (
        <Card
          key={gist.id}
          url={gist.files[Object.keys(gist.files)[0]].raw_url}
          gistId={gist.id}
          userLogin={gist.owner.login}
        />
        // <div key={gist.id} style={{ display: "flex", justifyContent: "space-around" }}>
        //   <img
        //     style={{ borderRadius: "50%", width: 30, height: 30 }}
        //     src={gist.owner.avatar_url}
        //     alt={`Avatar-${gist.owner.login}`}
        //   />
        //   <h3>{gist.owner.login}</h3>
        //   <p>{gist.files[Object.keys(gist.files)[0]].filename}</p>
        //   <div>{new Date(gist.created_at).toLocaleTimeString()}</div>
        // </div>
      ))}
    </div>
  );
}

export const gistsRoute = {
  element: <Gists />,
  loader: ({ request: { signal } }: LoaderFunctionArgs) => {
    return getPublicGists(signal);
  },
};
