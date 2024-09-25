import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <main>
      <h1>Oops!</h1>
      <p>Something went wrong.</p>
      <p>{error.statusText || error.message}</p>
    </main>
  );
}
