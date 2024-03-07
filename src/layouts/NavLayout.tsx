import { searchUsers } from "../api/search";
import NavBar from "../components/NavBar/NavBar";
import { ActionFunctionArgs, Outlet, ScrollRestoration, redirect, useNavigation } from "react-router-dom";

function NavLayout() {
  const { state } = useNavigation();
  const isLoading = state === "loading";
  return (
    <>
      <NavBar />
      <ScrollRestoration />
      <div className={`container ${isLoading ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  const searchInput = formData.get("searchInput") as string;
  console.log(Object.fromEntries(formData));
  const searchResults = await searchUsers(searchInput!);
  console.log(searchResults);
  return null;
}
export const navLayoutRoute = {
  element: <NavLayout />,
  action,
};
