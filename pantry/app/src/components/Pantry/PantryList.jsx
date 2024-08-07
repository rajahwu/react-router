// src/components/Pantry/PantryList.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { pantryService } from "../../services/firebase/pantryService";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const { user } = useAuth();
  const userPantries = await pantryService.getUserPantries(user.uid);
  return { pantries };
}

export default function PantryList() {
  const { pantries } = useLoaderData();

  return (
    <div>
      <h2>My Pantries</h2>
      {pantries.map((pantry) => (
        <div key={pantry.id}>{pantry.name}</div>
      ))}
    </div>
  );
}
