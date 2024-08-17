import { db } from "../../services/firebase"; // Adjust the import according to your project structure
import {
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
  addDoc,
  collection,
} from "firebase/firestore";

class Pantry {
  constructor(id, name, ownerId) {
    this.id = id;
    this.name = name;
    this.ownerId = ownerId;
  }

  static async create(name, ownerId) {
    const docRef = await addDoc(collection(db, "pantries"), {
      name,
      ownerId,
    });
    return new Pantry(docRef.id, name, ownerId);
  }

  static async getById(id) {
    const docRef = doc(db, "pantries", id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error(`Pantry with id ${id} not found`);
    }
    const data = docSnap.data();
    return new Pantry(docSnap.id, data.name, data.ownerId);
  }

  async update(name) {
    const docRef = doc(db, "pantries", this.id);
    await updateDoc(docRef, { name });
    this.name = name;
  }

  static async deleteById(id) {
    const docRef = doc(db, "pantries", id);
    await deleteDoc(docRef);
  }
}

export { Pantry };
