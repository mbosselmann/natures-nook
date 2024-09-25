import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/error.tsx";
import PlantDetailsPage from "./routes/plant.tsx";

import { plantLoader } from "./loader/plantLoader";
import { plantsLoader } from "./loader/plantsLoader";
import { App } from "./App.tsx";
import HomePage from "./routes/home.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    loader: plantsLoader,
    children: [
      {
        path: "/",
        element: <HomePage />,
        errorElement: <ErrorPage />,
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
