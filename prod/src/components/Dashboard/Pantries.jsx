import { Box, Button, Typography } from '@mui/material';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchImageUrl } from '../../services/giphy/fetchImageUrl';
import Carousel from './Carousel';

const Pantries = ({ pantries }) => {
  const [pantriesWithImages, setPantriesWithImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      const updatedPantries = await Promise.all(
        pantries.map(async (pantry) => {
          const imageUrl = await fetchImageUrl(pantry.name);
          return { ...pantry, imageUrl };
        })
      );
      setPantriesWithImages(updatedPantries);
      setLoading(false);
    }

    fetchImages();
  }, [pantries]);

  return (
    <Box
      component="section"
      sx={{
        textAlign: 'center',
        p: 2,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#fafafa',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>Pantries</Typography>
      {loading ? (
        <Typography variant="body2">Loading...</Typography>
      ) : (
        <Carousel items={pantriesWithImages} />
      )}
      {pantriesWithImages.length === 0 && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Typography variant="body2">No pantries available</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/pantries')}>
            + Add Pantry
          </Button>
        </Box>
      )}
    </Box>
  );
};

Pantries.propTypes = {
  pantries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};


export default Pantries;
