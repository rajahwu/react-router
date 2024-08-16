import { Box, Typography } from "@mui/material";
import React from 'react';
import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: '50%',
            padding: '0.2em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src="assets/logo-color.png" height={25} width={25} alt="Logo" />
        </Box>
        <Typography variant="h6" sx={{ ml: 1 }}>
          Pantry Management
        </Typography>
      </Box>
    </NavLink>
  );
}

export default Logo;
