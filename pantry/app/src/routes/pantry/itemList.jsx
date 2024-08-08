import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useLoaderData, useParams } from "react-router-dom";

export default function PantryItemList() {
  const { pantryId } = useParams();
  const { pantries } = useLoaderData();
  const selectedPantry = pantries.find((pantry) => pantry.id === pantryId);
  const items = selectedPantry ? selectedPantry.items : [];

  return (
    <Grid item xs={6}>
      <section id="main">
        <Typography variant="h6">
          {selectedPantry
            ? `Items in ${selectedPantry.name}`
            : "Select a pantry to see items"}
        </Typography>
        {selectedPantry && (
          <>
            <Button variant="contained" sx={{ marginBottom: "10px" }}>+ New Item</Button>
            {items.map((item) => (
              <Card
                key={item.id}
                sx={{ display: "flex", marginBottom: "10px", border: "1px solid blue" }}
              >
                <CardMedia
                  component="img"
                  image="https://picsum.photos/50/50?random=1"
                  title={item.imageAlt}
                  sx={{
                    height: 50,
                    width: 50,
                    justifySelf: "center",
                    alignSelf: "center",
                    margin: "10px",
                    borderRadius: "50%",
                  }}
                />

                <Box sx={{ display: "flex" }}>
                  <CardContent>
                    <Typography key={item.id}>{item.name}</Typography>
                    <Typography variant="body2">
                      {item.quantity} {item.unit}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      startIcon={<RemoveIcon />}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            ))}
          </>
        )}
      </section>
    </Grid>
  );
}
