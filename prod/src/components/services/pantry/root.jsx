// src/components/pantry/root.js
import { Grid } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Pantries from "./list";

export default function Root() {
  const path = useLocation().pathname;
  const isAddPantry = path.split("/").slice(-1)[0] === "add";
  
  return (
      <Grid container spacing={3} sx={{ borderBottom: "3px solid black", borderTop: "5px solid pink", paddingTop: "60px" }}>
        <Grid item xs={4} sx={{ borderRight: "3px solid black", height: "100%" }}>
          <Pantries isAddPantry={isAddPantry} />
        </Grid>
        <Grid item xs={8}>
          {!isAddPantry && <Outlet />}
        </Grid>
      </Grid>
  );
}
