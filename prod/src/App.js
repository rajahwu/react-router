// src/App.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      //TODO Add your navigation logic
    }
  }, [user]);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        {user ? (
          <>
          <Link to={`${user.displayName}/dashboard`}>Dashboard</Link>
          <Link to={`${user.displayName}/profile`}>Profile</Link>
          <Link to="signout">Sign Out</Link>
          </>
        ) :
        <Link to="login">Sign In</Link>}

      </nav>
      <Outlet />
    </div>
  );
};

export default App;
