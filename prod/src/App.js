import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/root/Header";
import Footer from "./components/root/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Header />
        <Box sx={{ marginTop: 10 }}>
          <main>
            <Outlet />
          </main>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
