import { createBrowserRouter, redirect } from "react-router-dom";
import { getPublicGists } from "./api/gists";
import NavLayout from "./layouts/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        index: true,
        loader: () => redirect("/gists"),
      },
      {
        path: "/gists",
        element: <h1>Gists</h1>,
        loader: (args) => {
          return getPublicGists(args);
        },
      },
    ],
  },
]);
