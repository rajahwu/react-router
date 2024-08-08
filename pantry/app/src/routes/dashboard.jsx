import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useAuth } from "context/AuthContext";

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center", mb: 4 }}>Dashboard</Typography>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <UserProfile />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
          <Pantries />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
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
        border: '1px solid #ccc',
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {user ? (
        <>
          <Typography variant="h5">{user.displayName}</Typography>
          <img src={user.photoURL} alt="User Avatar" style={{ borderRadius: "50%", width: "100px", height: "100px" }} />
        </>
      ) : (
        <Typography variant="body1">No user signed in</Typography>
      )}
    </Box>
  );
}

function Pantries() {
  const pantries = [];

  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        p: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5">Pantries</Typography>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {pantries.length ? (
          pantries.map((pantry) => (
            <li key={pantry.id}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 2 }}>
                <img src={pantry.imageUrl} alt={pantry.imageAlt} style={{ width: "50px", height: "50px" }} />
                <Typography variant="body1">{pantry.name}</Typography>
              </Box>
            </li>
          ))
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column',  gap: 3 }}>
          <Typography variant="body2">No pantries available</Typography>
          <Button variant="contained">+ Pantry</Button>
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
        border: '1px solid #ccc',
        borderRadius: '8px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
