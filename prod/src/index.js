// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignIn from "./components/auth/Login";
import SignOut from "./components/auth/SignOut";
import Dashboard, { loader as dashboardLoader } from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import Profile from "./components/Profile";
import PantryItems from "./components/services/pantry/items";
import PantryServicePage from "./components/services/pantry/root";
import { AuthProvider } from "./context/AuthContext";
import { action as demoSignInAction } from "./router/actions/auth/demo";
import { action as loginAction } from "./router/actions/auth/login";
import { action as signOutAction } from "./router/actions/auth/signout";
import { action as addPantry } from "./router/actions/services/pantry/add";
import { action as deletePantry } from "./router/actions/services/pantry/delete";
import { action as updatePantry } from "./router/actions/services/pantry/update";
import { loader as PantryServiceLoader } from "./router/loaders/pantry";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <LandingPage /> },
      // { path: "register", element: <div>Register</div> },
      { path: "login", element: <SignIn />, action: loginAction },
      { path: "signout", element: <SignOut />, action: signOutAction },
      { path: "demo-signin", action: demoSignInAction },
      {
        path: ":username",
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: dashboardLoader,
          },
          { path: "profile", element: <Profile /> },
          {
            path: "pantries",
            element: <PantryServicePage />,
            loader: PantryServiceLoader,
            children: [
              {
                index: true,
                element: <div>Select Panty to Display Items</div>,
              },
              {path: "add", action: addPantry},
              {path: "update", action: updatePantry},
              {path: "delete", action: deletePantry},
              {
                path: ":pantryId",
                element: <PantryItems />,
                loader: PantryServiceLoader,
                children: [
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const domNode = document.getElementById("root");
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
