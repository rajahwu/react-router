import Footer from "../Footer";
import Header from "../Header";
import { Container, Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Box component="main" height={200} width={200} my={4} gap={4} p={2}>
        {children}
      </Box>

      <Footer />
    </Container>
  );
}
