// src/services/firebase/pantryService.js
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./";

const pantryService = {
  async createPantry(userId, pantryData) {
    const pantryRef = await addDoc(collection(db, "pantries"), {
      ...pantryData,
      ownerId: userId,
    });
    return pantryRef.id;
  },

  async getUserPantries(userId) {
    const q = query(collection(db, "pantries"), where("ownerId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getUserPantriesWithItems(userId) {
    try {
      const q = query(
        collection(db, "pantries"),
        where("ownerId", "==", userId),
      );
      const pantriesSnapshot = await getDocs(q);

      if (pantriesSnapshot.empty) {
        console.log("No pantries found.");
        return [];
      }

      const pantriesWithItems = [];

      // Iterate over each pantry
      for (const pantryDoc of pantriesSnapshot.docs) {
        const pantryData = pantryDoc.data();
        const pantryId = pantryDoc.id;

        // Query items sub-collection for the current pantry
        const itemsCollection = collection(db, "pantries", pantryId, "items");
        const itemsSnapshot = await getDocs(itemsCollection);
        const items = itemsSnapshot.docs.map((itemDoc) => ({
          id: itemDoc.id,
          ...itemDoc.data(),
        }));

        // Add pantry with its items to the result array
        pantriesWithItems.push({
          id: pantryId,
          ...pantryData,
          items, // Include the related items
        });
      }

      return pantriesWithItems;
    } catch (error) {
      console.error("Error fetching pantries and items:", error);
      return [];
    }
  },

  async addItemToPantry(pantryId, item) {
    const itemsCollection = collection(db, "pantries", pantryId, "items");
    const itemRef = doc(itemsCollection); // Create a new document reference with auto-generated ID
    await setDoc(itemRef, item);
  },

  async updateItemInPantry(pantryId, itemId, updatedItem) {
    const itemRef = doc(db, "pantries", pantryId, "items", itemId);
    await updateDoc(itemRef, updatedItem);
  },

  async removeItemFromPantry(pantryId, itemId) {
    const itemRef = doc(db, "pantries", pantryId, "items", itemId);
    await deleteDoc(itemRef);
  },

  async deletePantry(pantryId) {
    // Optionally, delete items within the pantry before deleting the pantry
    const itemsCollection = collection(db, "pantries", pantryId, "items");
    const itemsSnapshot = await getDocs(itemsCollection);
    for (const itemDoc of itemsSnapshot.docs) {
      await deleteDoc(itemDoc.ref);
    }
    await deleteDoc(doc(db, "pantries", pantryId));
  },
};

export default pantryService;
