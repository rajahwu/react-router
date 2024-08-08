import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLoaderData } from "react-router-dom";
import pantryService from "services/firebase/pantryService";

// Loader function to fetch pantries for the authenticated user
export async function loader() {
  const auth = getAuth();
  let pantries = [];

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        pantries = await pantryService.getUserPantries(user.uid);
      }
      resolve({ pantries });
    });
  });
}

export default function Root() {
  const { pantries } = useLoaderData();
  const items = [];
  const selectedPantry = null;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <aside>
            <Typography variant="h6">Pantry List</Typography>
            {pantries.map((pantry) => (
              <Typography
                key={pantry.id}
                style={{ cursor: "pointer", marginBottom: "10px" }}
              >
                {pantry.name}
              </Typography>
            ))}
            <Button variant="contained">
              + Pantry
            </Button>
          </aside>
        </Grid>
        <Grid item xs={9}>
          <section id="main">
            <Typography variant="h6">
              {selectedPantry
                ? `Items in ${selectedPantry.name}`
                : "Select a pantry to see items"}
            </Typography>
            {selectedPantry && (
              <>
                {items.map((item) => (
                  <Typography key={item.id}>{item.name}</Typography>
                ))}
                <TextField
                  placeholder="New Item Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <Button variant="contained">
                  + Item
                </Button>
              </>
            )}
          </section>
        </Grid>
      </Grid>
    </Container>
  );
}
