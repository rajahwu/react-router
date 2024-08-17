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
import React, { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  useParams,
  useActionData,
  useNavigate,
} from "react-router-dom";

export default function PantryItems() {
  const { pantryId } = useParams();
  const { pantries } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();

  const [formList, setFormList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const selectedPantry = pantries
    ? pantries.find((pantry) => pantry.id === pantryId)
    : null;
  const items = selectedPantry ? selectedPantry.items : [];

  const handleAddItemClick = () => {
    setFormList([...formList, { id: Date.now() }]);
  };

  const handleRemoveForm = (formId) => {
    setFormList(formList.filter((form) => form.id !== formId));
  };

  // Use effect to handle form submission result
  useEffect(() => {
    if (actionData?.success) {
      // Reset form list and trigger a refresh
      setFormList([]);
      setRefresh(!refresh); // Toggle refresh state
    }
  }, [actionData, refresh]);

  // Use effect to refresh the list of items when the component mounts or refresh state changes
  useEffect(() => {
    if (refresh) {
      navigate(0); // Reload the page to get updated data
    }
  }, [refresh, navigate]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">
          {selectedPantry
            ? `Items in ${selectedPantry.name}`
            : "Select a pantry to see items"}
        </Typography>
        {selectedPantry && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddItemClick}
          >
            Add Item
          </Button>
        )}
      </Box>

      {formList.map((form) => (
        <Form key={form.id} method="post" action="addItem">
          <input
            type="hidden"
            name="pantryId"
            value={selectedPantry?.id || ""}
          />
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 2,
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
              color="error"
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
                mb: 2,
                p: 2,
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
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
                <Grid item xs={4}>
                  <Typography variant="body1">{item.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.quantity} {item.unit + (item.quantity > 1 ? "s" : "")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<RemoveIcon />}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                    >
                      Add
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Form method="post" action="deleteItem">
                    <input type="hidden" name="itemId" value={item.id} />
                    <input type="hidden" name="pantryId" value={pantryId} />
                    <Button
                      type="submit"
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
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
