import { Button, Grid, Typography } from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";

export default function PantryItemList() {
  const { pantryId } = useParams();
  const { pantries } = useLoaderData();
  const selectedPantry = pantries.find((pantry) => pantry.id === pantryId);
  const items = selectedPantry ? selectedPantry.items : [];

  return (
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
            <Button variant="contained">+ Item</Button>
          </>
        )}
      </section>
    </Grid>
  );
}
