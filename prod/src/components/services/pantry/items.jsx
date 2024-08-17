import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as dayjs from "dayjs";
import {
  Box,
  Button,
  Card,
  CardMedia,
  TextField,
  Typography,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  Form,
  useLoaderData,
  useParams,
  useActionData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

export default function PantryItems() {
  const { pantryId } = useParams();
  const { pantries } = useLoaderData();
  const actionData = useActionData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [formList, setFormList] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({
    name: "",
    quantity: "",
    unit: "",
    expiryDate: null,
  });

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

      // const pantryToShow = actionData.pantryId || pantryId;
      
      // navigate(`/pantry/${pantryToShow}`, { replace: true });

      setFormList([]);
      setEditItemId(null);
    }
  }, [actionData]);

  const handleEditClick = (item) => {
    setEditItemId(item.id);
    setEditedItem({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      expiryDate: item.expiryDate
        ? new Date(item.expiryDate.seconds * 1000)
        : null,
    });
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDateChange = (date) => {
    setEditedItem((prevState) => ({ ...prevState, expiryDate: date }));
  };

  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditedItem({ name: "", quantity: "", unit: "", expiryDate: null });
  };

  const handleFormSubmit = (event) => {
    submit(event.currentTarget, { replace: true });
  };

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
          <Form method="post" action="addItem" onSubmit={handleFormSubmit}>
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
                name="expiryDate"
                value={
                  editedItem.expiryDate ? dayjs(editedItem.expiryDate) : null
                }
                onChange={handleDateChange}
                slotProps={{ TextField: 'outlined' }}
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
                color="secondary"
                size="small"
                sx={{ minWidth: "40px", padding: "4px 8px" }}
                onClick={() => handleRemoveForm(form.id)}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </Box>
      ))}

      {selectedPantry &&
        items.map((item) => (
          <Card
            key={item.id}
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              display: "flex",
              mb: 2,
            }}
          >
            {editItemId === item.id ? (
              <Form method="post" action="updateItem" onSubmit={handleFormSubmit}>
                <input type="hidden" name="itemId" value={item.id} />
                <input type="hidden" name="pantryId" value={pantryId} />
                <CardContent sx={{ padding: 2 }}>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: 2,
                    }}
                  >
                    <TextField
                      name="name"
                      label="Item"
                      variant="outlined"
                      value={editedItem.name}
                      onChange={handleItemChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="quantity"
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      value={editedItem.quantity}
                      onChange={handleItemChange}
                      required
                      fullWidth
                    />
                    <TextField
                      name="unit"
                      label="Unit"
                      variant="outlined"
                      value={editedItem.unit}
                      onChange={handleItemChange}
                      required
                      fullWidth
                    />
                    <DatePicker
                      name="expiryDate"
                      value={
                        editedItem.expiryDate
                          ? dayjs(editedItem.expiryDate)
                          : null
                      }
                      onChange={handleDateChange}
                      slotProps={{ TextField: 'outlined' }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ minWidth: "100px" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="small"
                      sx={{ minWidth: "40px", padding: "4px 8px" }}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </Box>
                </CardContent>
              </Form>
            ) : (
              <>
                <CardMedia
                  component="img"
                  sx={{ width: 151, height: "100%", objectFit: "cover" }}
                  image="https://picsum.photos/50/50?random=1"
                  title={item.imageAlt}
                />
                <Box
                  sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                >
                  <CardContent
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      border: "1px solid #ccc",
                      padding: 2,
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body1" color="textSecondary">
                      {item.quantity}{" "}
                      {item.unit + (item.quantity > 1 ? "s" : "")}
                    </Typography>
                    {/* <Typography>
                    {item.expiryDate.seconds} 
                    </Typography> */}
                  </CardContent>
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
                        onClick={() => handleEditClick(item)}
                      >
                        <Typography variant="caption">Edit</Typography>
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Form method="post" action="deleteItem">
                        <input type="hidden" name="itemId" value={item.id} />
                        <input type="hidden" name="pantryId" value={pantryId} />
                        <Button
                          type="submit"
                          variant="small"
                          size="small"
                          startIcon={<DeleteIcon />}
                        >
                          <Typography variant="caption">Delete</Typography>
                        </Button>
                      </Form>
                    </Box>
                  </CardActions>
                </Box>
              </>
            )}
          </Card>
        ))}
    </Box>
  );
}
