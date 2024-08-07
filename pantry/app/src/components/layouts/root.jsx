import { Box, Container } from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";

export default function Layout({ children }) {
  return (
    <Container>
      <Header />
      <Box component="main" my={4} gap={4} p={2}>
        {children}
      </Box>

      <Footer />
    </Container>
  );
}
