import { Food } from "./food.model";

export class Cart {
    mapCart: Map<number, Food> = new Map();

    constructor() {
        
    }

    getCart() {
      return this.mapCart;
    }




}