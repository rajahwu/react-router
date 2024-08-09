import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Form, useLoaderData, useParams } from "react-router-dom";

export default function PantryItemList() {
  const { pantryId } = useParams();
  const { pantries } = useLoaderData();
  const selectedPantry = pantries.find((pantry) => pantry.id === pantryId);
  const items = selectedPantry ? selectedPantry.items : [];

  const [formList, setFormList] = useState([]);

  const handleAddItemClick = () => {
    setFormList([...formList, { id: Date.now() }]);
  };

  const handleRemoveForm = (formId) => {
    setFormList(formList.filter((form) => form.id !== formId));
  };

  return (
    <Box id="main" sx={{ marginRight: 3 }}>
      <Box sx={{ display: "flex", gap: 3, marginBottom: "10px" }}>
        <Typography variant="h6">
          {selectedPantry
            ? `Items in ${selectedPantry.name}`
            : "Select a pantry to see items"}
        </Typography>
        {selectedPantry && (
          <Button
            variant="contained"
            sx={{ marginBottom: "10px" }}
            onClick={handleAddItemClick}
          >
            + Add Item
          </Button>
        )}
      </Box>

      {formList.map((form) => (
        <Form
          key={form.id}
          method="post"
          action="addItem"
        >
          <input type="hiddeni" name="pantryId" value={selectedPantry.id} />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            <TextField
              name="name"
              label="Item Name"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              name="quantity"
              label="Quantity"
              type="number"
              variant="outlined"
              required
              fullWidth
            />
            <TextField
              name="unit"
              label="Unit"
              variant="outlined"
              required
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ minWidth: "100px" }}
            >
              Add
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ minWidth: "40px", padding: "4px 8px" }}
              onClick={() => handleRemoveForm(form.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Form>
      ))}

      {selectedPantry && (
        <>
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid blue",
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={2}>
                  <CardMedia
                    component="img"
                    image="https://picsum.photos/50/50?random=1"
                    title={item.imageAlt}
                    sx={{
                      height: 50,
                      width: 50,
                      borderRadius: "50%",
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.quantity} {item.unit + (item.quantity > 1 ? "s" : "")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Form method="post" action={`/pantry/${pantryId}/addItem`}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <TextField
                        name="quantity"
                        type="number"
                        inputProps={{ min: 1 }}
                        defaultValue={1}
                        size="small"
                        sx={{ width: 60 }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        {item.unit}
                      </Typography>
                      <input type="hidden" name="itemId" value={item.id} />
                      <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        startIcon={<AddIcon />}
                        sx={{ minWidth: "40px", padding: "4px 8px" }}
                      >
                        Add
                      </Button>
                    </Box>
                  </Form>
                </Grid>
                <Grid item xs={4}>
                  <Form
                    method="post"
                    action={`/pantry/${pantryId}/removeItem`}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        name="quantity"
                        type="number"
                        inputProps={{ min: 1 }}
                        defaultValue={1}
                        size="small"
                        sx={{ width: 60 }}
                      />
                      <Typography variant="body2" color="textSecondary">
                        {item.unit}
                      </Typography>
                      <input type="hidden" name="itemId" value={item.id} />
                      <Button
                        type="submit"
                        size="small"
                        variant="contained"
                        startIcon={<RemoveIcon />}
                        sx={{ minWidth: "40px", padding: "4px 8px" }}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Form>
                </Grid>
              </Grid>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
}
