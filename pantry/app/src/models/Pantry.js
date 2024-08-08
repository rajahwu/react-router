import admin from "firebase-admin";

class Pantry {
  constructor(id, name, ownerId, items = []) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
    this.items = items;
  }

  static async create(name, ownerId) {
    const db = admin.firestore();
    const docRef = db.collection("pantries").doc(); // auto-generated ID
    const newPantry = new Pantry(docRef.id, name, ownerId);
    await docRef.set({
      name: newPantry.name,
      ownerId: newPantry.ownerId,
      items: newPantry.items,
    });
    return newPantry;
  }

  static async getById(id) {
    const db = admin.firestore();
    const docRef = db.collection("pantries").doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Pantry with id ${id} not found`);
    }
    const data = doc.data();
    return new Pantry(doc.id, data.name, data.ownerId, data.items);
  }

  async update(name, items) {
    const db = admin.firestore();
    const docRef = db.collection("pantries").doc(this.id);
    await docRef.update({ name, items });
    this.name = name;
    this.items = items;
  }

  static async deleteById(id) {
    const db = admin.firestore();
    const docRef = db.collection("pantries").doc(id);
    await docRef.delete();
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
    const db = admin.firestore();
    const docRef = db
      .collection("pantries")
      .doc(pantryId)
      .collection("items")
      .doc(); // auto-generated ID
    const newItem = new PantryItem(docRef.id, name, quantity, unit, expiryDate);
    await docRef.set({
      name: newItem.name,
      quantity: newItem.quantity,
      unit: newItem.unit,
      expiryDate: newItem.expiryDate,
    });
    return newItem;
  }

  static async getById(pantryId, itemId) {
    const db = admin.firestore();
    const docRef = db
      .collection("pantries")
      .doc(pantryId)
      .collection("items")
      .doc(itemId);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Item with id ${itemId} not found`);
    }
    const data = doc.data();
    return new PantryItem(
      doc.id,
      data.name,
      data.quantity,
      data.unit,
      data.expiryDate,
    );
  }

  async update(name, quantity, unit, expiryDate) {
    const db = admin.firestore();
    const docRef = db
      .collection("pantries")
      .doc(this.pantryId)
      .collection("items")
      .doc(this.id);
    await docRef.update({ name, quantity, unit, expiryDate });
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.expiryDate = expiryDate;
  }

  static async deleteById(pantryId, itemId) {
    const db = admin.firestore();
    const docRef = db
      .collection("pantries")
      .doc(pantryId)
      .collection("items")
      .doc(itemId);
    await docRef.delete();
  }
}

export { Pantry, PantryItem };
