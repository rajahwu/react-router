// src/components/LandingPage.js
import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h2" gutterBottom>
        Pantry Management App
      </Typography>
      <Typography variant="h6" paragraph>
        Organize and manage your pantry items with ease.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button
          component={Link}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/register"
          variant="outlined"
          color="secondary"
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
