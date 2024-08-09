// routes/pantry/addItem.js
import { faker } from "@faker-js/faker";
import { PantryItem } from "../../models/Pantry";

export async function action({ request }) {
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const name = formData.get("name");
  const quantity = formData.get("quantity");
  const unit = formData.get("unit");
  const expiryDate = formData.get("expiryDate") ?? faker.date.future({ weeks: 2 });
  console.log("Adding item:", {name, quantity, unit, expiryDate, pantryId});

  try {
    const newItem = await PantryItem.create(name, quantity, unit, expiryDate, pantryId);
    return newItem; // return the newly created item or redirect as needed
  } catch (error) {
    console.error("Failed to add item:", error);
    return { error: "Failed to add item." };
  }
}
