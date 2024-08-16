// src/components/Profile.js
import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      {user ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <img
            src={user.photoURL}
            alt="User Avatar"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginBottom: "16px",
            }}
          />
          <Typography variant="h6">{user.displayName}</Typography>
          <Typography variant="body1">{user.email}</Typography>
        </Box>
      ) : (
        <Typography variant="body1">No user signed in</Typography>
      )}
    </Container>
  );
}
