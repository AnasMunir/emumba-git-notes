import { ActionFunctionArgs, LoaderFunctionArgs, RouteObject, redirect, useLoaderData } from "react-router-dom";
import { TGist, getGist, updateGist } from "../api/gists";
import GistForm, { gistFormValidator } from "../components/GistForm";

function EditGist() {
  const gistData = useLoaderData() as TGist;
  const defaultValues = {
    description: gistData.description || "",
    name: gistData.files[Object.keys(gistData.files)[0]].filename || "",
    content: gistData.files[Object.keys(gistData.files)[0]].content || "",
  };
  return <GistForm method='patch' defaultValues={defaultValues} />;
}

async function loader({ params, request: { signal } }: LoaderFunctionArgs) {
  return getGist(params.gistId!, signal);
}

async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const errors = gistFormValidator({ description, name, content });

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const files = { [name]: { content } };
  await updateGist({ data: { description, files }, id: params.gistId!, options: request.signal });

  return redirect(`..`);
}

export const editGistRoute: RouteObject = {
  element: <EditGist />,
  loader,
  action,
};
