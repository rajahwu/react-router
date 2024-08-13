// src/App.js
import { Container } from "@mui/material";
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header'; // Import the Header component


const App = () => {
  return (
    <>
      <Header /> {/* Add Header component */}
      <Container sx={{ marginTop: 8 }}> {/* Adjust marginTop to ensure content is below the header */}
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  );
};

export default App;
