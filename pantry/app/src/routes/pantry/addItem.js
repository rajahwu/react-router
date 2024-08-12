// routes/pantry/addItem.js
import { faker } from "@faker-js/faker";
import { auth } from "../../firebase";
import { redirect } from "react-router-dom";
import { PantryItem } from "../../models/Pantry";

export async function action({ request }) {
  const user = auth.currentUser;
  if (!user) {
    return { error: "You must be logged in to add an item." };
  }
  const formData = await request.formData();
  const pantryId = formData.get("pantryId");
  const name = formData.get("name");
  const quantity = formData.get("quantity");
  const unit = formData.get("unit");
  const expiryDate = formData.get("expiryDate") ?? faker.date.future({ weeks: 2 });
  try {
    const newItem = await PantryItem.create(name, quantity, unit, expiryDate, pantryId);
    return redirect(`/${user.displayName}/pantries/${newItem.pantryId}`);
  } catch (error) {
    console.error("Failed to add item:", error);
    return { error: "Failed to add item." };
  }
}
