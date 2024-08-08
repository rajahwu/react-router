import { Button, Container, Grid, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
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
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <aside>
            <Typography variant="h6">Pantry List</Typography>
            {pantries.map((pantry) => (
              <NavLink key={pantry.id} to={`pantry/${pantry.id}`}>
                <Typography style={{ cursor: "pointer", marginBottom: "10px" }}>
                  {pantry.name}
                </Typography>
              </NavLink>
            ))}
            <Button variant="contained">+ Pantry</Button>
          </aside>
        </Grid>
        <Outlet />
      </Grid>
    </Container>
  );
}
