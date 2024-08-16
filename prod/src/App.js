import { Box, Container } from "@mui/material";
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/root/Header';
import Footer from './components/root/Footer';

const App = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ paddingTop: 4 }}
    >
      <Header />
      <Box sx={{ marginTop: 10 }}>
        <main>
          <Outlet />
        </main>
      </Box>
    </Container>
  );
};

export default App;
