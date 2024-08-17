//src/App.js
import { Box, Container } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/root/Header";
import Footer from "./components/root/Footer";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
        <Header />
        <Box sx={{ marginTop: 10 }}>
          <main>
            <Outlet />
          </main>
        </Box>
      </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
