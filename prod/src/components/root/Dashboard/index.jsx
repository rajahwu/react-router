import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PropTypes from "prop-types";
import React from "react";
import { useLoaderData } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import pantryService from "../../../services/firebase/pantryService";
import Pantries from "./Pantries";

export async function loader() {
  const auth = getAuth();
  let pantries = [];

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        pantries = await pantryService.getUserPantriesWithItems(user.uid);
      }
      resolve({ pantries });
    });
  });
}

const Dashboard = () => {
  const { pantries } = useLoaderData();
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={6} md={4}>
          <UserProfile />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Pantries pantries={pantries} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Settings />
        </Grid>
      </Grid>
    </Container>
  );
};

function UserProfile() {
  const { user } = useAuth();

  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      {user ? (
        <>
          <img
            src={user.photoURL}
            alt="User Avatar"
            style={{
              borderRadius: "50%",
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginBottom: "8px",
            }}
          />
          <Typography variant="h6">{user.displayName}</Typography>
        </>
      ) : (
        <Typography variant="body1">No user signed in</Typography>
      )}
    </Box>
  );
}

UserProfile.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    photoURL: PropTypes.string,
  }),
};

function Settings() {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Settings
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1">Modes</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined">☀️ Day</Button>
          <Button variant="outlined">🌙 Night</Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="body1">Themes</Typography>
        {/* TODO: Dropdown to choose theme */}
      </Box>
    </Box>
  );
}

export default Dashboard;
