import { Container } from "@mui/material";
import { NavLink, Form } from "react-router-dom";
import { useAuth } from "context/AuthContext";

export default function Header() {
  const { user } = useAuth();

  return (
    <Container>
      <header>
        <nav>
          <ul>
            {user ? (
              <>
                <li>
                  <NavLink to="/">Home</NavLink>
                </li>
                <li>
                  <Form method="post" action="/signout">
                    <button type="submit">Sign Out</button>
                  </Form>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/register">Register</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </Container>
  );
}
