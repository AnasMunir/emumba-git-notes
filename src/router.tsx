import { createBrowserRouter } from "react-router-dom";
import { getPublicGists } from "./api/gists";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>Gists</h1>,
    loader: (args) => {
      return getPublicGists(args);
    },
  },
]);
