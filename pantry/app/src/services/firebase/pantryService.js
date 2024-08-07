// src/services/firebase/pantryService.js
import { db } from '/src/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';

export const pantryService = {
  async createPantry(userId, pantryData) {
    const pantryRef = await addDoc(collection(db, 'pantries'), {
      ...pantryData,
      ownerId: userId,
    });
    return pantryRef.id;
  },

  async getUserPantries(userId) {
    const q = query(collection(db, 'pantries'), where('ownerId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },

  async addItemToPantry(pantryId, item) {
    const pantryRef = doc(db, 'pantries', pantryId);
    await updateDoc(pantryRef, {
      items: arrayUnion(item)
    });
  },

  async updateItemInPantry(pantryId, itemId, updatedItem) {
    const pantryRef = doc(db, 'pantries', pantryId);
    // Implement the logic to update a specific item in the pantry
  },

  async removeItemFromPantry(pantryId, itemId) {
    const pantryRef = doc(db, 'pantries', pantryId);
    // Implement the logic to remove a specific item from the pantry
  },

  async deletePantry(pantryId) {
    await deleteDoc(doc(db, 'pantries', pantryId));
  }
};