import { Container } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Container>
      <nav>
        <ul>
          <li>
            {pathname !== "/" && <NavLink to="/">Home</NavLink>}
          </li>
          <li>
            {pathname !== "/register" && <NavLink to="/register">Register</NavLink>}
          </li>
        </ul>
      </nav>
    </Container>
  );
}
