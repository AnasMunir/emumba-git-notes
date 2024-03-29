import { ActionFunctionArgs, Form, Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import { TGist, deleteGist, getGist } from "../api/gists";
import Card from "../components/Card/Card";
import { useContext } from "react";
import GistInfo from "../components/GistInfo/GistInfo";
import EditIcon from "../components/icons/EditIcon";
import DeleteIcon from "../components/icons/DeleteIcon";
import StarIcon from "../components/icons/StarIcon";
import { UserContext } from "../context/user";

function Gist() {
  const gist = useLoaderData() as TGist;
  const { id } = useContext(UserContext);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0px" }}>
        <GistInfo
          src={gist.owner.avatar_url}
          gistId={gist.id}
          username={gist.owner.login}
          filename={gist.files[Object.keys(gist.files)[0]].filename}
          createdAt={gist.created_at}
        />
        {gist.owner.id === id && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to='edit'>
              <button className='icon-btn'>
                <EditIcon />
                Edit
              </button>
            </Link>
            <Form method='delete' replace>
              <button className='icon-btn' type='submit'>
                <DeleteIcon />
                Delete
              </button>
            </Form>
            <Form method='post' replace>
              <button className='icon-btn'>
                <StarIcon /> Stars <div>{}</div>
              </button>
            </Form>
          </div>
        )}
      </div>
      <Card gist={gist} showUserLink={false} showEnterFile />
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
