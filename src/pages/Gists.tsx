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
