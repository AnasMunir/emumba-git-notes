import { router } from "./router";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./context/user";

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
