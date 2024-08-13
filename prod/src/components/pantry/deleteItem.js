// routes/pantry/deleteItem.js

import { PantryItem } from "../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const itemId = formData.get("itemId");

  try {
    await PantryItem.deleteById(pantryId, itemId);
    return { success: true }; // return success or redirect as needed
  } catch (error) {
    console.error("Failed to delete item:", error);
    return { error: "Failed to delete item." };
  }
}
