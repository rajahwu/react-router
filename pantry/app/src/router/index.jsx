// src/router/index.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login, { action as loginAction, loader as loginLoader } from "routes/auth/login";
import { ProtectedRoute } from "routes/auth/ProtectedRoute";
import Register, { loader as registerLoader, action as registrationAction } from "routes/auth/register";
import SignOut, { action as signOutAction } from "routes/auth/signout";
import Dashboard from "routes/dashboard";
import Root from "routes/root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="pantries" />
      <Route path="pantry/:pantryId" />
      <Route path="settings">
        <Route path="profile" />
        <Route path="theme" />
        <Route path="account" />
      </Route>
      <Route
        path="register"
        element={<Register />}
        loader={registerLoader}
        action={registrationAction}
      />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />
      <Route path="signout" element={<SignOut />} action={signOutAction} />
    </Route>,
  ),
);

export default router;
