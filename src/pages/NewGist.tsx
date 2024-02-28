import { ActionFunctionArgs, redirect, useActionData } from "react-router-dom";
import { createGist } from "../api/gists";
import GistForm, { TGistFormErrors, gistFormValidator } from "../components/GistForm";

function NewGist() {
  const errors = useActionData() as TGistFormErrors;
  return <GistForm errors={errors} />;
}

async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const description = formData.get("description") as string;
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;

  console.log(description);
  console.log(name);
  console.log(content);
  const errors = gistFormValidator({ description, name, content });

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const file = { [name]: { content } };
  createGist(description, file);

  return redirect(`/`);
}

export const newGistRoute = {
  element: <NewGist />,
  action,
};
