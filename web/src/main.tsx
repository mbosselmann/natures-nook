import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  LoaderFunction,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import ErrorPage from "./Error.tsx";
import PlantDetailsPage from "./routes/plant.tsx";

import { plantLoader } from "./loader/plantLoader";
import { plantsLoader } from "./loader/plantsLoader";

const AppLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        loader: plantsLoader as unknown as LoaderFunction,
      },
      {
        path: "/plant/:id",
        element: <PlantDetailsPage />,
        errorElement: <ErrorPage />,
        loader: plantLoader as unknown as LoaderFunction,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
