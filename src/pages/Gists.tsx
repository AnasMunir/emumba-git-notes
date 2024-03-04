import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getPublicGists } from "../api/gists";
import Card from "../components/Card";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Paginator from "../components/Paginator";

// TODO: create styles and sub components
function Gists() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  return (
    <>
      <div className='card-grid'>
        <Link className='btn btn-outline' to='new'>
          New
        </Link>
        {gists.map((gist) => (
          <Card key={gist.id} gist={gist} />
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <Paginator links={paginationLinks.links} />
      </div>
    </>
  );
}

export const gistsRoute = {
  element: <Gists />,
  loader: ({ request: { signal, url } }: LoaderFunctionArgs) => {
    const searchParams = new URL(url).searchParams;
    const page = searchParams.get("page");
    const perPage = searchParams.get("per_page");
    return getPublicGists(signal, page, perPage);
  },
};
