// src/models/Pantry.js
class Pantry {
    constructor(id, name, ownerId, items = []) {
      this.id = id;
      this.name = name;
      this.ownerId = ownerId;
      this.items = items;
    }
  }
  
  class PantryItem {
    constructor(id, name, quantity, unit) {
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.unit = unit;
    }
  }
  
  export { Pantry, PantryItem };