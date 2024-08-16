// routes/pantry/updatePantry.js

import { Pantry } from "../../../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const name = formData.get("pantryName");

  try {
    const pantry = await Pantry.getById(pantryId);
    await pantry.update(name, pantry.items);
    return pantry; // return the updated pantry or redirect as needed
  } catch (error) {
    console.error("Failed to update pantry:", error);
    return { error: "Failed to update pantry." };
  }
}
