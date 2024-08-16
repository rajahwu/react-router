// routes/pantry/updateItem.js

import { PantryItem } from "../../../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const itemId = formData.get("itemId");
  const name = formData.get("itemName");
  const quantity = formData.get("quantity");
  const unit = formData.get("unit");
  const expiryDate = formData.get("expiryDate");

  try {
    const item = await PantryItem.getById(pantryId, itemId);
    await item.update(name, quantity, unit, expiryDate);
    return item; // return the updated item or redirect as needed
  } catch (error) {
    console.error("Failed to update item:", error);
    return { error: "Failed to update item." };
  }
}
