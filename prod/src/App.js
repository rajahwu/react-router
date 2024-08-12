// src/App.js
import React from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes,
  redirect
} from "react-router-dom";
import SignIn from './components/auth/sign-in';
import { useAuth } from './context/AuthContext';
import { loader as signInLoader } from './router/loaders/sign-in';
import { action as singInAction } from './router/actions/sign-in';

const RootLayout = () => {
  const { user } = useAuth();
  if (user) {
    return redirect(`${user.displayName}/dashboard`);
  }
  console.log(user);
  return (
    <div>
      <h1>Root Layout</h1>
      <Outlet />
    </div>
  )
}

const App = () => {
  return (
    <>
    <div>
      <Link to="/">Home</Link>
      <Link to="dashboard">Dashboard</Link>
      <Link to="profile">Profile</Link>
      <Link to="/">Sign In</Link>
    </div>
    <Routes>
      <Route path="/" element={<RootLayout />} errorElement={<div>Nope</div>}>
      <Route index element={<SignIn />} loader={signInLoader}/>
      <Route path="register" element={<div>Register</div>} />
      <Route path=":username/dashboard" element={<div>Dashboard</div>} />
      <Route path=":username/profile" element={<div>Profile</div>} />
      </Route>
    </Routes>
    </>
  )
}

export default App;