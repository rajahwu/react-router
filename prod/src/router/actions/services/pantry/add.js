// routes/pantry/addPantry.js
import { Pantry } from "../../../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("pantryName");
  const ownerId = formData.get("ownerId");
  
  try {
    const newPantry = await Pantry.create(name, ownerId);
    return { success: true, pantry: newPantry };
  } catch (error) {
    console.error("Failed to create pantry:", error);
    return { error: "Failed to create pantry." };
  }
}
