import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getGist } from "../api/gists";
import Card from "../components/Card";

function Gist() {
  const gistData = useLoaderData() as TGist;
  return <Card url={gistData.files[Object.keys(gistData.files)[0]].raw_url} />;
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  return getGist(params.gistId!, signal);
}

export const gistRoute = {
  element: <Gist />,
  loader,
};
