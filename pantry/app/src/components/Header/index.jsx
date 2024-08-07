import { Container } from "@mui/material";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAuth } from "context/AuthContext";
import { Form, NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const userNavItems = ["", "pantries", "settings"];
  const loginNavItems = ["register", "login"];

  return (
    <Container>
      <header>
        <nav>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                {user ? "User Menu" : "Guest Menu"}
              </Typography>
            </Grid>

            {user ? (
              <>
                {userNavItems.map((item) => (
                  <Grid item key={item}>
                    <NavLink to={`/${item}`} style={{ margin: '0 10px' }}>
                      {item === "" ? "Home" : item.charAt(0).toUpperCase() + item.slice(1)}
                    </NavLink>
                  </Grid>
                ))}
                <Grid item>
                  <Form method="post" action="/signout">
                    <button type="submit">Sign Out</button>
                  </Form>
                </Grid>
              </>
            ) : (
              loginNavItems.map((item) => (
                <Grid item key={item}>
                  <NavLink to={`/${item}`} style={{ margin: '0 10px' }}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </NavLink>
                </Grid>
              ))
            )}
          </Grid>
        </nav>
      </header>
    </Container>
  );
}
