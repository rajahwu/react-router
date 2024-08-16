import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { Form, NavLink, useLoaderData } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Pantries() {
  const { user } = useAuth();
  const { pantries } = useLoaderData();
  const [pantryForms, setPantryForms] = useState([]);

  const handleAddPantryClick = () => {
    setPantryForms([...pantryForms, { id: pantryForms.length }]);
  };

  const handleRemovePantryForm = (id) => {
    setPantryForms(pantryForms.filter((form) => form.id !== id));
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
          <Form method="post" action="add">
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
            </Box>
          </Form>
          <Button
            variant="outlined"
            color="error"
            sx={{ minWidth: "40px", padding: "4px 8px", mt: 1 }}
            onClick={() => handleRemovePantryForm(form.id)}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ))}

      {pantries.map((pantry) => (
        <Card
          key={pantry.id}
          sx={{
            mb: 2,
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          <NavLink to={`${pantry.id}`} style={{ textDecoration: "none" }}>
            {({ isActive }) => (
            <CardContent
              sx={{
                backgroundColor: isActive ? "cyan" : "primary.main",
                color: "white",
                border: isActive ? '2px solid cyan' : '1px solid #ccc',
                borderBottom: 1,
                borderColor: 'divider',
                padding: 2,
                textDecoration: "none",
              }}
            >
              <Typography variant="h6">
                {pantry.name}
              </Typography>
            </CardContent>
            )}
          </NavLink>
          <CardActions sx={{ justifyContent: "center" }}>
            <Form method="post" action="update">
              <Button size="small" startIcon={<EditIcon />}>
                Edit
              </Button>
            </Form>
            <Form method="post" action="delete">
              <input type="hidden" name="pantryId" value={pantry.id} />
              <Button
                type="submit"
                size="small"
                startIcon={<HighlightOffIcon />}
              >
                Delete
              </Button>
            </Form>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}