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
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Form, NavLink, useLoaderData } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          justifyContent: "baseline",
          marginBottom: "10px",
        }}
      >
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
        <Box key={form.id} sx={{ marginBottom: "10px", marginRight: 2 }}>
          <Form method="post" action="add">
            <Box sx={{ display: "flex", gap: 2 }}>
              <input type="hidden" name="ownerId" value={user.uid} />
              <TextField
                name="pantryName"
                type="text"
                placeholder="Pantry Name"
                inputProps={{ min: 1 }}
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
            color="secondary"
            sx={{ minWidth: "40px", padding: "4px 8px" }}
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
            marginBottom: "10px",
            border: "1px solid blue",
            marginRight: 3,
          }}
        >
          <NavLink to={`${pantry.id}`}>
            <CardContent
              sx={{
                borderBottom: "2px solid black",
                backgroundColor: "primary.main",
                color: "white",
              }}
            >
              <Typography
                variant="h6"
                sx={{ cursor: "pointer", marginBottom: "10px" }}
              >
                {pantry.name}
              </Typography>
            </CardContent>
          </NavLink>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
            <Form method="post" action="update">
              <Button size="small" startIcon={<EditIcon />}>
                Edit
              </Button>
            </Form>
            <Form method="post" action="delete">
              <input type="hidden" name="pantryId" value={pantry.id} />
              <Button type="submit" size="small" startIcon={<HighlightOffIcon />}>
                Delete
              </Button>
            </Form>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
}

Pantries.propTypes = {
  isAddPantry: PropTypes.bool,
};
