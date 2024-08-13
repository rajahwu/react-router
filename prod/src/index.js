// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import { AuthProvider } from './context/AuthContext';
import { action as signInAction } from './router/actions/login';
import { action as signOutAction } from './router/actions/signout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <div>Home</div> },
      { path: 'register', element: <div>Register</div> },
      { path: 'login', element: <SignIn />, action: signInAction },
      { path: 'signout', element: <SignOut />, action: signOutAction },
      { path: ':username/dashboard', element: <div>Dashboard</div> },
      { path: ':username/profile', element: <div>Profile</div> },
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
