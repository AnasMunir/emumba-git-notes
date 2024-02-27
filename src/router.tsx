import { createBrowserRouter, redirect } from "react-router-dom";
import { getPublicGists } from "./api/gists";
import NavLayout from "./layouts/NavLayout";
import Gists from "./pages/Gists";

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
        element: <Gists />,
        loader: (args) => {
          return getPublicGists(args);
        },
      },
    ],
  },
]);
