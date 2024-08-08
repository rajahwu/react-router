import { Box, Button, Card, CardActions, CardContent, Container, Grid, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import pantryService from "services/firebase/pantryService";

// Loader function to fetch pantries for the authenticated user
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

export default function Root() {
  const { pantries } = useLoaderData();
  const navigate = useNavigate();
  return (
    <Container sx={{ borderTop: "3px solid black", borderBottom: "3px solid black" }}>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Box sx={{ borderRight: "3px solid black" }}>
            <Typography variant="h6">Pantries</Typography>
            <Button variant="contained" sx={{ marginBottom: "10px" }}>+ Pantry</Button>
            {pantries.map((pantry) => (
              <Card key={pantry.id} sx={{ marginBottom: "10px", border: "1px solid blue", marginRight: 3 }}>
                <CardContent>
                <Typography sx={{ cursor: "pointer", marginBottom: "10px" }}>
                  {pantry.name}
                </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => navigate(`pantry/${pantry.id}`)}>View</Button>
                  <Button size="small">Edit</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </Grid>
        <Outlet />
      </Grid>
    </Container>
  );
}
