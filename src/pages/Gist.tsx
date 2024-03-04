import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { TGist, deleteGist, getGist } from "../api/gists";
import Card from "../components/Card";
import { useContext } from "react";
import { AuthContext } from "../App";

function Gist() {
  const gist = useLoaderData() as TGist;
  const { id } = useContext(AuthContext);

  return (
    <>
      {gist.owner.id === id && (
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
      )}
      <br />
      <br />
      <Card gist={gist} />
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
