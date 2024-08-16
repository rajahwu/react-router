import { Box, Button, Container, Modal, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LandingPage() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDemoSignIn = () => {
    // Navigate to demo sign in page or logic for demo sign in
    navigate('/demo-signin');
  };

  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h2" gutterBottom>
        Pantry Management App
      </Typography>
      <Typography variant="h6" paragraph>
        Organize and manage your pantry items with ease.
      </Typography>
      {!user &&
        <Box sx={{ mt: 4 }}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleOpen}
          >
            Register
          </Button>
        </Box>
      }

      {/* Modal for registration */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Registration Unavailable
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            Registration is currently unavailable for this application. If you would like to try out the app, please sign in as a demo user.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleDemoSignIn}
          >
            Sign In as Demo User
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}
