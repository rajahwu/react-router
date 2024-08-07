// src/router/index.jsx
import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';
import Root from 'routes/root';
import Register, { action as registrationAction } from 'routes/register';
import Login, { action as loginAction } from 'routes/login';
import SignOut, { action as signOutAction } from 'routes/signout';
import { ProtectedRoute } from 'routes/ProtectedRoute'; 

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<ProtectedRoute><div>main content</div></ProtectedRoute>} />
      <Route path="register" element={<Register />} action={registrationAction} />
      <Route path="login" element={<Login />} action={loginAction} />
      <Route path="signout" element={<SignOut />} action={signOutAction} />
    </Route>
  )
);

export default router;
