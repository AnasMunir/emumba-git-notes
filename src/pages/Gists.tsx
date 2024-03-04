import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getPublicGists } from "../api/gists";
import Card from "../components/Card/Card";
import { TPaginationLinks } from "../utils/parseLinkHeaders";
import Paginator from "../components/Paginator";
import { useState } from "react";

function Gists() {
  const { gists, paginationLinks } = useLoaderData() as { gists: TGist[]; paginationLinks: TPaginationLinks };
  const [displayFormat, setDisplayForm] = useState<"cards" | "list">("cards");
  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          style={{ borderRight: "1px solid lightgray", padding: "0.5rem", cursor: "pointer" }}
          onClick={() => setDisplayForm("cards")}>
          Card
        </p>
        <p style={{ padding: "0.5rem", cursor: "pointer" }} onClick={() => setDisplayForm("list")}>
          List
        </p>
      </div>
      {displayFormat === "cards" ? (
        <div className='card-grid'>
          {gists.map((gist) => (
            <Card key={gist.id} gist={gist} />
          ))}
        </div>
      ) : (
        <div></div>
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
