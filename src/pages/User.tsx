import { getUserGists } from "../api/gists";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

function User() {
  const userGists = useLoaderData();
  console.log(userGists);
  return <div>User</div>;
}

function loader({ request: { signal } }: LoaderFunctionArgs) {
  return getUserGists(signal);
}
export const userRoute = {
  element: <User />,
  loader,
};
