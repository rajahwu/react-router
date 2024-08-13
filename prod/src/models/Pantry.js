import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../services/firebase';

class Pantry {
  constructor(id, name, ownerId, items = []) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.items = items;
  }

  static async create(name, ownerId) {
    const docRef = await addDoc(collection(db, "pantries"), {
      name,
      ownerId,
      items: [],
    });
    const newPantry = new Pantry(docRef.id, name, ownerId);
    return newPantry;
  }

  static async getById(id) {
    const docRef = doc(db, "pantries", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Pantry with id ${id} not found`);
    }
    const data = docSnap.data();
    return new Pantry(docSnap.id, data.name, data.ownerId, data.items);
  }

  async update(name, items) {
    const docRef = doc(db, "pantries", this.id);
    await updateDoc(docRef, { name, items });
    this.name = name;
    this.items = items;
  }

  static async deleteById(id) {
    const docRef = doc(db, "pantries", id);
    await deleteDoc(docRef);
  }
}

class PantryItem {
  constructor(id, name, quantity, unit, expiryDate) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.expiryDate = expiryDate;
  }

  static async create(name, quantity, unit, expiryDate, pantryId) {
    const docRef = await addDoc(
      collection(db, "pantries", pantryId, "items"),
      {
        name,
        quantity,
        unit,
        expiryDate,
      }
    );
    const newItem = new PantryItem(
      docRef.id,
      name,
      quantity,
      unit,
      expiryDate
    );
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
      data.expiryDate
    );
  }

  async update(name, quantity, unit, expiryDate) {
    const docRef = doc(db, "pantries", this.pantryId, "items", this.id);
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

export { Pantry, PantryItem };
