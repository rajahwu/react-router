import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  TextField,
  Typography,
  Container,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  NavLink,
  Form,
  useLoaderData,
  useParams,
  useActionData,
  useNavigate,
} from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";


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

  useEffect(() => {
    if (actionData?.success) {
      setFormList([]);
      setRefresh(!refresh);
    }
  }, [actionData, refresh]);

  useEffect(() => {
    if (refresh) {
      navigate(0);
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
        <Box key={form.id} sx={{ mb: 2 }}>
          <Form key={form.id} method="post" action="addItem">
            <input
              type="hidden"
              name="pantryId"
              value={selectedPantry?.id || ""}
            />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 2,
                mb: 2,
                alignItems: "center",
              }}
            >
              <TextField
                name="name"
                label="Item"
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
              <DatePicker
                label="Expiration Date"
                slotProps={{
                  textField: {
                    name: "expiryDate",
                    variant: "outlined",
                    fullWidth: true,
                  },
                }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ minWidth: "100px" }}
              >
                Add Item
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
        </Box>
      ))}

      {selectedPantry && (
        <>
          {items.map((item) => (
            <Card
              key={item.id}
              sx={{
                border: 2,
                borderColor: "divider",
                borderRadius: 1,
                display: "flex",
                mb: 2
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 151, height: '100%', objectFit: 'cover' }}
                image="https://picsum.photos/50/50?random=1"
                title={item.imageAlt}
              />
              <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <NavLink style={{ textDecoration: "none" }}>
                  {({isActive}) => (
                <CardContent
                  sx={{
                    backgroundColor: isActive ? "cyan" : "primary.main",
                    color: "white",
                    border: isActive ? "2px solid cyan" : "1px solid #ccc",
                    padding: 2,
                    textDecoration: "none",
                  }}
                >
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="body1" color="textSecondary">
                    {item.quantity} {item.unit + (item.quantity > 1 ? "s" : "")}
                  </Typography>
                  <Typography>
                    {new Date(item.expiryDate.seconds * 1000).toLocaleDateString()}
                  </Typography>
                </CardContent>
                  )}
                </NavLink>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0 8px",
                  }}
                >
                  <Box 
                   sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  >
                    <Button
                      variant="small"
                      size="small"
                      startIcon={<EditIcon />}
                    >
                      <Typography variant="caption">
                      Edit
                      </Typography>
                    </Button>
                  </Box>
                  <Form method="post" action="deleteItem">
                    <input type="hidden" name="itemId" value={item.id} />
                    <input type="hidden" name="pantryId" value={pantryId} />
                    <Button
                      type="submit"
                      color="error"
                      size="small"
                    >
                      <Typography variant="caption">
                      Cancel
                      </Typography>
                    </Button>
                  </Form>
                </CardActions>
              </Box>
            </Card>
          ))}
        </>
      )}
    </Box>
  );
}
