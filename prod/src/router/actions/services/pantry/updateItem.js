// routes/pantry/updateItem.js

import { PantryItem } from "../../../../models/PantryItem";

export async function action({ request }) {
  const formData = await request.formData();
  const itemId = formData.get("itemId");
  const pantryId = formData.get("pantryId");
  const name = formData.get("name");
  const quantity = formData.get("quantity");
  const unit = formData.get("unit");
  const expiryDate = formData.get("expiryDate");

  try {
    const item = await PantryItem.getById(pantryId, itemId);
    await item.update(name, quantity, unit, expiryDate, pantryId);
    return item; // return the updated item or redirect as needed
  } catch (error) {
    console.error("Failed to update item:", error);
    return { error: "Failed to update item." };
  }
}
