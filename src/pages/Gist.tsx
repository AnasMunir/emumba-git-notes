import { Link, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { TGist, getGist } from "../api/gists";
import Card from "../components/Card";

function Gist() {
  const gistData = useLoaderData() as TGist;
  return (
    <>
      <Link to='edit' className='btn'>
        Edit
      </Link>
      <br />
      <br />
      <Card content={gistData.files[Object.keys(gistData.files)[0]].content} />
    </>
  );
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  return getGist(params.gistId!, signal);
}

export const gistRoute = {
  element: <Gist />,
  loader,
};
