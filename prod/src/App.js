// src/App.js
import React from 'react';
import {
  Route,
  Routes
} from "react-router-dom";
import SignIn from './components/auth/sign-in';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  )
}

export default App;