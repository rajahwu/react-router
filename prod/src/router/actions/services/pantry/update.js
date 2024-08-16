// routes/pantry/updatePantry.js
import { Pantry } from "../../../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const newName = formData.get("pantryName");

  console.log("Pantry ID:", pantryId); // Debugging line
  try {
    const pantry = await Pantry.getById(pantryId);
    await pantry.update(newName);
    return null; // Success response
  } catch (error) {
    console.error("Failed to update pantry:", error);
    return { error: "Failed to update pantry." };
  }
}
