import admin from "firebase-admin";
import { readFile } from "fs/promises";
import { Pantry, PantryItem } from "../src/models/Pantry.js"; // Adjust the path as necessary

// Path to your service account key file
const serviceAccountPath = new URL("../firebase-adminsdk-key.json", import.meta.url);

// Read the service account key file
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function seedDatabase() {
  try {
    // Clear existing data
    const db = admin.firestore();
    const pantriesCollection = db.collection("pantries");
    const pantriesSnapshot = await pantriesCollection.get();
    for (const doc of pantriesSnapshot.docs) {
      await doc.ref.delete();
    }

    // Define pantries and items
    const userId = "aGHfWPM0WzPvx77VRBS4dqQJdtA3";
    const pantries = [
      { name: "Kitchen Pantry", ownerId: userId },
      { name: "Garage Pantry", ownerId: userId },
      { name: "Basement Pantry", ownerId: userId },
    ];

    const items = [
      { name: "Canned Beans", quantity: 10, unit: "can", expiryDate: "2025-12-31" },
      { name: "Pasta", quantity: 5, unit: "box", expiryDate: "2025-06-30" },
      { name: "Tomato Sauce", quantity: 8, unit: "jar", expiryDate: "2024-11-15" },
      { name: "Rice", quantity: 20, unit: "kg", expiryDate: "2026-03-01" },
      { name: "Oats", quantity: 15, unit: "kg", expiryDate: "2024-08-30" },
      { name: "Flour", quantity: 10, unit: "kg", expiryDate: "2025-05-25" },
      { name: "Sugar", quantity: 12, unit: "kg", expiryDate: "2025-10-10" },
    ];

    // Insert new data
    const pantryRefs = [];
    for (const pantry of pantries) {
      const newPantry = await Pantry.create(pantry.name, pantry.ownerId);
      pantryRefs.push(newPantry);
    }

    for (const item of items) {
      const randomPantry = pantryRefs[Math.floor(Math.random() * pantryRefs.length)]; // pick a random pantry
      await PantryItem.create(item.name, item.quantity, item.unit, item.expiryDate, randomPantry.id);
    }

    console.log("Database seeded successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}

seedDatabase();
