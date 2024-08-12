// src/App.js
import React from 'react';
import {
  Link,
  Outlet,
  Route,
  Routes
} from "react-router-dom";
import SignIn from './components/auth/sign-in';

const RootLayout = () => {
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
      <Route index element={<SignIn />} />
      <Route path="dashboard" element={<div>Dashboard</div>} />
      <Route path="profile" element={<div>Profile</div>} />
      </Route>
    </Routes>
    </>
  )
}

export default App;