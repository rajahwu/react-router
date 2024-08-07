import { Container, Grid, Typography, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <Container component="footer" style={{ marginTop: '20px', padding: '20px 0' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Contact Us</Typography>
          <Typography variant="body2">
            Email: <Link href="mailto:support@example.com">support@example.com</Link>
          </Typography>
          <Typography variant="body2">
            Phone: <Link href="tel:+1234567890">+1 (234) 567-890</Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Quick Links</Typography>
          <Typography variant="body2">
            <NavLink to="/about">About Us</NavLink>
          </Typography>
          <Typography variant="body2">
            <NavLink to="/privacy">Privacy Policy</NavLink>
          </Typography>
          <Typography variant="body2">
            <NavLink to="/terms">Terms of Service</NavLink>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Follow Us</Typography>
          <Typography variant="body2">
            <Link href="https://twitter.com/example" target="_blank" rel="noopener">
              Twitter
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="https://facebook.com/example" target="_blank" rel="noopener">
              Facebook
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="body2" align="center" style={{ marginTop: '20px' }}>
        &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
      </Typography>
    </Container>
  );
}
