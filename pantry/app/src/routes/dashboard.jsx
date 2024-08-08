import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useAuth } from "context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLoaderData, useNavigate } from "react-router-dom";
import pantryService from "services/firebase/pantryService";

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
  console.log(pantries);
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>
        Dashboard
      </Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <UserProfile />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
          <Pantries pantries={pantries} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: "flex" }}>
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
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {user ? (
        <>
          <Typography variant="h5">{user.displayName}</Typography>
          <img
            src={user.photoURL}
            alt="User Avatar"
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
        </>
      ) : (
        <Typography variant="body1">No user signed in</Typography>
      )}
    </Box>
  );
}

function Pantries({ pantries }) {
  const navigate = useNavigate();
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <Typography variant="h5">Pantries</Typography>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pantries.length ? (
          pantries.map((pantry) => (
            <li key={pantry.id}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  mb: 2,
                }}
              >
                <Typography variant="body1">{pantry.name}</Typography>
                <Box sx={{ display: "flex" }}>
                  <img
                    src={
                      pantry.imageUrl ??
                      "https://picsum.photos/100/100?random=1"
                    }
                    alt={pantry.imageAlt}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <Box>
                    {pantry.items.length
                      ? pantry.items.map((item) => (
                          <span key={item.id}>{item.name}</span>
                        ))
                      : null}
                    <Typography variant="body2">
                      {pantry.items.length} items
                    </Typography>
                  </Box>
                </Box>
                {/* <Button variant="contained" onClick={() => navigate(`/pantry/${pantry.id}`)}>View</Button> */}
              </Box>
            </li>
          ))
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Typography variant="body2">No pantries available</Typography>
            <Button variant="contained" onClick={() => navigate("/pantries")}>
              + Pantry
            </Button>
          </Box>
        )}
      </ul>
    </Box>
  );
}

function Settings() {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        p: 2,
        border: "1px solid #ccc",
        borderRadius: "8px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5">Settings</Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Modes</Typography>
        <span>☀️</span>
        <span>🌙</span>
      </Box>
      <Box>
        <Typography variant="h6">Themes</Typography>
        {/* TODO: Dropdown to choose theme */}
      </Box>
    </Box>
  );
}

export default Dashboard;
