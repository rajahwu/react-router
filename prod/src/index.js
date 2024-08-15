// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignIn from './components/auth/Login';
import SignOut from './components/auth/SignOut';
import Dashboard, { loader as dashboardLoader } from './components/Dashboard';
import PantryItems from './components/services/pantry/PantryItems';
import PantryServicePage from './components/services/pantry/root';
import { AuthProvider } from './context/AuthContext';
import { action as loginAction } from './router/actions/login';
import { action as signOutAction } from './router/actions/signout';
import { loader as PantryServiceLoader } from './router/loaders/pantry';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: 'register', element: <div>Register</div> },
      { path: 'login', element: <SignIn />, action: loginAction },
      { path: 'signout', element: <SignOut />, action: signOutAction },
      { path: ':username/dashboard', element: <Dashboard />, loader: dashboardLoader },
      { path: ':username/profile', element: <div>Profile</div> },
      {
        path: ':username/pantries',
        element: <PantryServicePage />,
        loader: PantryServiceLoader,
        children: [
          { index: true, element: <div>Select Panty to Display Items</div> },
          { path: ':pantryId', element: <PantryItems />, loader: PantryServiceLoader },
        ]
      }
    ],
  },
]);

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
