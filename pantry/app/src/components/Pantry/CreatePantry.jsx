// src/components/Pantry/CreatePantry.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { pantryService } from '../../services/firebase/pantryService';

export function CreatePantry() {
  const { user } = useAuth();
  const [pantryName, setPantryName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pantryService.createPantry(user.uid, { name: pantryName });
    setPantryName('');
    // Optionally, refresh the pantry list or navigate to the new pantry
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={pantryName}
        onChange={(e) => setPantryName(e.target.value)}
        placeholder="Pantry Name"
      />
      <button type="submit">Create Pantry</button>
    </form>
  );
}