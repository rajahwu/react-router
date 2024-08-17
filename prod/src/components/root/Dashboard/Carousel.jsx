import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Box, IconButton, Slide, Typography } from "@mui/material";
import React, { useState } from "react";

const Carousel = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Adjust based on your design

  const handleNextPage = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Box sx={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <IconButton
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={handlePrevPage}
        disabled={currentPage === 0}
      >
        <NavigateBeforeIcon />
      </IconButton>

      <Box sx={{ display: "flex", overflow: "hidden" }}>
        {items
          .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
          .map((item, index) => (
            <Slide
              key={index}
              direction="left"
              in={true}
              timeout={{ enter: 500, exit: 500 }}
              sx={{ minWidth: "100%", flexShrink: 0 }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {item.name}
                </Typography>
                <img
                  src={
                    item.imageUrl ?? "https://picsum.photos/150/150?random=1"
                  }
                  alt={item.name}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "8px",
                  }}
                />
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.items.length} items
                </Typography>
              </Box>
            </Slide>
          ))}
      </Box>

      <IconButton
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
        }}
        onClick={handleNextPage}
        disabled={currentPage >= Math.ceil(items.length / itemsPerPage) - 1}
      >
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
