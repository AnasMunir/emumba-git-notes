import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { TGist, deleteGist, getGist } from "../api/gists";
import Card from "../components/Card";

function Gist() {
  const gistData = useLoaderData() as TGist;

  return (
    <>
      <div style={{ display: "flex" }}>
        <Link to='edit' className='btn'>
          Edit
        </Link>
        <Form method='delete' replace>
          <button className='btn' type='submit'>
            Delete
          </button>
        </Form>
      </div>
      <br />
      <br />
      <Card content={gistData.files[Object.keys(gistData.files)[0]].content} />
    </>
  );
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  return getGist(params.gistId!, signal);
}

async function action({ params, request: { signal } }: ActionFunctionArgs) {
  await deleteGist({ id: params.gistId!, options: signal });
  return redirect("/gists");
}

export const gistRoute = {
  element: <Gist />,
  loader,
  action,
};
