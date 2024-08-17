import { Grid } from "@mui/material";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Pantries from "./list";

export default function Root() {
  const path = useLocation().pathname;
  const isAddPantry = path.split("/").slice(-1)[0] === "add";

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={4}
        sx={{ borderRight: 1, borderColor: "divider", height: "100%" }}
      >
        <Pantries />
      </Grid>
      <Grid item xs={8}>
        {!isAddPantry && <Outlet />}
      </Grid>
    </Grid>
  );
}
