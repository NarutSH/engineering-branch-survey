import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/main-layout";
import DashboardPage from "./pages/dashboard";
import NotFoundPage from "./pages/notfound";
import VotePage from "./pages/vote";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFoundPage />,
      children: [
        {
          element: <DashboardPage />,
          path: "/",
        },
        {
          element: <VotePage />,
          path: "/vote",
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
