import NavBar from "../components/NavBar/NavBar";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

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

export default NavLayout;
