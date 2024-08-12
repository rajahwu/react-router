// src/router/index.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "../routes/auth/login";
import { ProtectedRoute } from "../routes/auth/ProtectedRoute";
import Register, {
  loader as registerLoader,
  action as registrationAction,
} from "../routes/auth/register";
import SignOut, { action as signOutAction } from "../routes/auth/signout";
import Dashboard, { loader as dashboardLoader } from "../routes/dashboard";
import { action as addPantryAction } from "../routes/pantry/add";
import { action as addPantryItemAction } from "../routes/pantry/addItem";
import { action as deletePantryAction } from "../routes/pantry/delete";
import { action as deletePantryItemAction } from "../routes/pantry/deleteItem";
import PantryItemList from "../routes/pantry/itemList";
import PantryPage, { loader as pantryPageLoader } from "../routes/pantry/root";
import { action as updatePantryAction } from "../routes/pantry/update";
import { action as updatePantryItemAction } from "../routes/pantry/updateItem";
import Root from "../routes/root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route
        path="register"
        element={<Register />}
        loader={registerLoader}
        action={registrationAction}
      />
      <Route
        path="login"
        element={<Login />}
        loader={loginLoader}
        action={loginAction}
      />
      <Route path="signout" element={<SignOut />} action={signOutAction} />

      <Route path=":username">
        <Route
          path="dashboard"
          loader={dashboardLoader}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Pantries Page with Nested Routes */}
        <Route
          path="pantries"
          element={<PantryPage />}
          loader={pantryPageLoader}
        >
          {/* Default to displaying pantry item list */}
          <Route index element={<PantryItemList />} loader={pantryPageLoader} />

          {/* Pantry CRUD Operations */}
          <Route path="add" action={addPantryAction} />
          <Route path="update" action={updatePantryAction} />
          <Route path="delete" action={deletePantryAction} />

          {/* Specific Pantry with Nested Item Routes */}
          <Route path=":pantryId">
            {/* Display list of items in a pantry */}
            <Route
              index
              element={<PantryItemList />}
              loader={pantryPageLoader}
            />
            {/* Pantry Item CRUD Operations */}
            <Route path="addItem" action={addPantryItemAction} />
            <Route path="updateItem" action={updatePantryItemAction} />
            <Route path="deleteItem" action={deletePantryItemAction} />
          </Route>
        </Route>
      </Route>

      {/* Additional settings routes */}
      <Route path="settings">
        <Route path="profile" />
        <Route path="theme" />
        <Route path="account" />
      </Route>
    </Route>
  )
);

export default router;
