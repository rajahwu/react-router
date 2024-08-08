import { Container, Grid } from "@mui/material";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, useLocation } from "react-router-dom";
import Pantries from "routes/pantry/pantries";
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
  const path = useLocation().pathname;
  const isAddPantry = path.split("/").slice(-1)[0] === "add";
  return (
    <Container>
      <Grid container spacing={3} sx={{ borderBottom: "3px solid black", borderTop: "3px solid black" }}>
        <Grid item xs={4} sx={{ borderRight: "3px solid black" }}>
          <Pantries isAddPantry={isAddPantry} />
        </Grid>
        <Grid item xs={5}>
          {!isAddPantry && <Outlet />}
        </Grid>
        <Grid item xs={3} sx={{ borderLeft: "3px solid black" }}>
          <header>
            <ul>
              <li>Select Items to Find Recipes</li>
            </ul>
          </header>
        </Grid>
      </Grid>
    </Container>
  );
}
