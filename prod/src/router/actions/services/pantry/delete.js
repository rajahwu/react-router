// routes/pantry/deletePantry.js

import { Pantry } from "../../../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  try {
    await Pantry.deleteById(pantryId);
    return { success: true }; // return success or redirect as needed
  } catch (error) {
    console.error("Failed to delete pantry:", error);
    return { error: "Failed to delete pantry." };
  }
}
