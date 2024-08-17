import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

class PantryItem {
  constructor(id, name, quantity, unit, expiryDate) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.expiryDate = expiryDate;
  }

  static async create(name, quantity, unit, expiryDate, pantryId) {
    const docRef = await addDoc(collection(db, "pantries", pantryId, "items"), {
      name,
      quantity,
      unit,
      expiryDate,
    });
    const newItem = new PantryItem(docRef.id, name, quantity, unit, expiryDate);
    return newItem;
  }

  static async getById(pantryId, itemId) {
    const docRef = doc(db, "pantries", pantryId, "items", itemId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Item with id ${itemId} not found`);
    }
    const data = docSnap.data();
    return new PantryItem(
      docSnap.id,
      data.name,
      data.quantity,
      data.unit,
      data.expiryDate,
    );
  }

  async update(name, quantity, unit, expiryDate, pantryId) {
    const docRef = doc(db, "pantries", pantryId, "items", this.id);
    await updateDoc(docRef, { name, quantity, unit, expiryDate });
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.expiryDate = expiryDate;
  }

  static async deleteById(pantryId, itemId) {
    const docRef = doc(db, "pantries", pantryId, "items", itemId);
    await deleteDoc(docRef);
  }
}

export { PantryItem };
