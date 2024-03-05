import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getPublicGists } from "../api/gists";
import Card from "../components/Card/Card";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Paginator from "../components/Paginator";
import { useState } from "react";
import ListIcon from "../components/icons/ListIcon";
import GridIcon from "../components/icons/GridIcon";
import GistTable from "../components/GistTable/GistTable";

function Gists() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  const [displayFormat, setDisplayForm] = useState<"cards" | "list">("cards");
  return (
    <>
      <div className='listing'>
        <div onClick={() => setDisplayForm("cards")}>
          <GridIcon fill={displayFormat === "cards" ? "green" : ""} />
        </div>
        <div onClick={() => setDisplayForm("list")}>
          <ListIcon fill={displayFormat === "list" ? "green" : ""} />
        </div>
      </div>
      {displayFormat === "cards" ? (
        <div className='card-grid'>
          {gists.map((gist) => (
            <Card key={gist.id} gist={gist} />
          ))}
        </div>
      ) : (
        <GistTable gists={gists} />
      )}
      <div style={{ marginTop: "20px" }}>
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
