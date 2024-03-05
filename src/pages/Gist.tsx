import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { TGist, deleteGist, getGist } from "../api/gists";
import Card from "../components/Card/Card";
import { useContext } from "react";
import { UserContext } from "../App";
import GistInfo from '../components/GistInfo/GistInfo';

function Gist() {
  const gist = useLoaderData() as TGist;
  const { id } = useContext(UserContext);

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
      <div style={{ margin: "15px 0px" }}>
        <GistInfo
          src={gist.owner.avatar_url}
          gistId={gist.id}
          username={gist.owner.login}
          filename={gist.files[Object.keys(gist.files)[0]].filename}
          createdAt={gist.created_at}
        />
      </div>
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
