import { createBrowserRouter, redirect } from "react-router-dom";
import { getPublicGists } from "./api/gists";
import NavLayout from "./layouts/NavLayout";
import Gists from "./pages/Gists";
import { gistRoute } from "./pages/Gist";
import { newGistRoute } from "./pages/NewGist";

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
        children: [
          {
            index: true,
            element: <Gists />,
            loader: (args) => {
              return getPublicGists(args);
            },
          },
          // TODO: create components
          {
            path: "new",
            ...newGistRoute,
          },
          {
            path: ":gistId",
            children: [
              {
                index: true,
                ...gistRoute,
              },
              {
                path: "edit",
                element: <h1>Edit Gist</h1>,
              },
            ],
          },
        ],
      },
    ],
  },
]);
