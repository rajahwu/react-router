// src/App.js
import { Container } from "@mui/material";
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const App = () => {
  return (
    <>
      <Header />
      <Container sx={{ marginTop: 8 }}>
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default App;
