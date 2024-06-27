import React from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";

import HomePage from "./home/Home";
import Pathfinding from "./pathfinding/Pathfinding";
import Sorting from "./sorting/Sorting";

import "./index.css";

let router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/pathfinding",
    element: <Pathfinding />,
  },
  {
    path: "/sorting",
    element: <Sorting />,
  },
]);

export default function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
