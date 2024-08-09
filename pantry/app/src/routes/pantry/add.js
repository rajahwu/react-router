// routes/pantry/addPantry.js
import { Pantry } from "../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("pantryName");
  const ownerId = formData.get("ownerId");
  console.log("Adding pantry:", name, ownerId);

  try {
    const newPantry = await Pantry.create(name, ownerId);
    return newPantry; // return the newly created pantry or redirect as needed
  } catch (error) {
    console.error("Failed to create pantry:", error);
    return { error: "Failed to create pantry." };
  }
}
