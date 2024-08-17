import React, { useState } from "react";
import { Form, NavLink, useLoaderData, useSubmit } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Pantries() {
  const { user } = useAuth();
  const { pantries } = useLoaderData();
  const [pantryForms, setPantryForms] = useState([]);
  const [editPantryId, setEditPantryId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const submit = useSubmit();

  const handleAddPantryClick = () => {
    setPantryForms([...pantryForms, { id: pantryForms.length }]);
  };

  const handleRemovePantryForm = (id) => {
    setPantryForms(pantryForms.filter((form) => form.id !== id));
  };

  const handleEditClick = (pantry) => {
    setEditPantryId(pantry.id);
    setNewTitle(pantry.name);
  };

  const handleCancelEdit = () => {
    setEditPantryId(null);
    setNewTitle("");
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    submit(formData, { method: "post", action: "update" });
    setEditPantryId(null);
    setNewTitle("");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    submit(formData, { method: "post", action: "add" });

    // Clear the pantry forms after submission
    setPantryForms([]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Pantries</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddPantryClick}
        >
          Add Pantry
        </Button>
      </Box>

      {pantryForms.map((form) => (
        <Box key={form.id} sx={{ mb: 2 }}>
          <Form method="post" action="add" onSubmit={handleFormSubmit}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <input type="hidden" name="ownerId" value={user.uid} />
              <TextField
                name="pantryName"
                type="text"
                placeholder="Pantry Name"
                size="small"
                required
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ minWidth: "40px", padding: "4px 8px" }}
              >
                <AddIcon />
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={() => handleRemovePantryForm(form.id)}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </Box>
      ))}

      {pantries.map((pantry) => (
        <Card
          key={pantry.id}
          sx={{
            mb: 2,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
          }}
        >
          {editPantryId === pantry.id ? (
            <Form method="post" onSubmit={handleUpdateSubmit}>
              <input type="hidden" name="pantryId" value={pantry.id} />
              <CardContent sx={{ padding: 2 }}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    name="pantryName"
                    value={newTitle}
                    onChange={handleTitleChange}
                    size="small"
                    fullWidth
                    required
                    sx={{ alignItems: "center", justifyContent: "center" }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ minWidth: "40px", padding: "4px 8px" }}
                  >
                    <SaveIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ minWidth: "40px", padding: "6px 16px" }}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Form>
          ) : (
            <>
              <NavLink to={`${pantry.id}`} style={{ textDecoration: "none" }}>
                {({ isActive }) => (
                  <CardContent
                    sx={{
                      backgroundColor: isActive ? "cyan" : "primary.main",
                      color: "white",
                      border: isActive ? "2px solid cyan" : "1px solid #ccc",
                      padding: 2,
                      textDecoration: "none",
                    }}
                  >
                    <Typography variant="h6">{pantry.name}</Typography>
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
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEditClick(pantry)}
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
                  <Form method="post" action="delete">
                    <input type="hidden" name="pantryId" value={pantry.id} />
                    <Button
                      type="submit"
                      size="small"
                      startIcon={<HighlightOffIcon />}
                    >
                      <Typography variant="caption">Delete</Typography>
                    </Button>
                  </Form>
                </Box>
              </CardActions>
            </>
          )}
        </Card>
      ))}
    </Box>
  );
}
