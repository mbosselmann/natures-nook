import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Error.tsx";
import PlantDetailsPage from "./routes/plant.tsx";

import { plantLoader } from "./loader/plantLoader";

const router = createBrowserRouter([
  { path: "/", element: <App />, errorElement: <ErrorPage /> },
  {
    path: "/plant/:id",
    element: <PlantDetailsPage />,
    errorElement: <ErrorPage />,
    loader: plantLoader as unknown as LoaderFunction,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
