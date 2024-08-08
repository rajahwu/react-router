import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useAuth } from "context/AuthContext";
import { useEffect } from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userNavItems = ["", "pantries", "settings"];
  const loginNavItems = ["register", "login"];

  // Redirect if the user is logged in and tries to access login or register
  useEffect(() => {
    if (user) {
      const currentPath = window.location.pathname;
      if (loginNavItems.includes(currentPath.substring(1))) {
        navigate("/");
      }
    }
  }, [user, loginNavItems, navigate]);

  // Determine the header text
  const headerText = user
    ? user.displayName
      ? `${user.displayName} Menu`
      : "User Menu"
    : "Guest Menu";

  return (
    <Container>
      <header>
        <nav>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="div">
                {headerText}
              </Typography>
            </Grid>

            {user ? (
              <>
                {userNavItems.map((item) => (
                  <Grid item key={item}>
                    <NavLink to={`/${item}`} style={{ margin: "0 10px" }}>
                      {item === ""
                        ? "Home"
                        : item.charAt(0).toUpperCase() + item.slice(1)}
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
                  <NavLink to={`/${item}`} style={{ margin: "0 10px" }}>
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
