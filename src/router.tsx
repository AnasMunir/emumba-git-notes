import { createBrowserRouter, redirect } from "react-router-dom";
import NavLayout from "./layouts/NavLayout";
import { gistsRoute } from "./pages/Gists";
import { gistRoute } from "./pages/Gist";
import { newGistRoute } from "./pages/NewGist";
import { editGistRoute } from "./pages/EditGist";
import { userRoute } from "./pages/User";
import ErrorPage from "./pages/ErrorPage";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: () => redirect("/gists"),
          },
          {
            path: ":userLogin",
            ...userRoute,
          },
          {
            path: "/gists",
            children: [
              {
                index: true,
                ...gistsRoute,
              },
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
                    ...editGistRoute,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
