import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError() as { message: string; stack: string };
  return (
    <>
      <h1>Some Error Occured</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}

export default ErrorPage;
