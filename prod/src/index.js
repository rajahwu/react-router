// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignIn from './components/auth/Login';
import SignOut from './components/auth/SignOut';
import Dashboard, { loader as dashboardLoader } from './components/Dashboard';
import PantryPage from './components/pantry/root';
import { AuthProvider } from './context/AuthContext';
import { action as loginAction } from './router/actions/login';
import { action as signOutAction } from './router/actions/signout';
import { loader as PantryPageLoader } from './router/loaders/pantryPage';

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
        element: <PantryPage />,
        loader: PantryPageLoader,
        children: [
          { index: true, element: <div>Pantries</div> },
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
