import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography
} from "@mui/material";
import { useAuth } from "context/AuthContext";
import PropTypes from "prop-types";
import { Form, NavLink, useLoaderData, useNavigate } from "react-router-dom";

export default function Pantries({ isAddPantry }) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { pantries } = useLoaderData();
    return (
        <Box>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "baseline", marginBottom: "10px"}}>
            <Typography variant="h6">Pantries</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("add")}>Add Pantry</Button>
          </Box>
            {isAddPantry &&
            <Form method="post" action="/add">
              <input type="hidden" value={user.uid} />
              <input type="text" placeholder="Pantry Name" />
              <Button type="submit">Add Pantry</Button>
            </Form>
            }
            {pantries.map((pantry) => (
              <Card key={pantry.id} sx={{ marginBottom: "10px", border: "1px solid blue", marginRight: 3 }}>
                <CardContent>
                  <NavLink to={`pantry/${pantry.id}`}>
                <Typography sx={{ cursor: "pointer", marginBottom: "10px" }}>
                  {pantry.name}
                </Typography>
                </NavLink>
                </CardContent>
                <CardActions>
                  <Button size="small">Edit</Button>
                  <Button size="small">Delete</Button>
                </CardActions>
              </Card>
            ))}
          </Box>
    )
}

Pantries.propTypes = {
  isAddPantry: PropTypes.bool,
};