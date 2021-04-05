import { ifStmt } from "@angular/compiler/src/output/output_ast";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AppConstant } from "./app-constant";
import { LocalStorageService } from "./local-storage.service";
import { Food } from "./model/food.model";

@Injectable({ providedIn: 'root' })
export class  CartService {
    mapCart: Map<number, Food> = new Map<number, Food>();
    //key: supplierId, value: totalPrice
    mapPrice: Map<string, number> = new Map<string, number>();
    cartSubject = new Subject<Map<number, Food>>();
    cartPriceSubject = new Subject<Map<string, number>>();
    constructor(private storageService: LocalStorageService) {

    }

    addToCart(food: Food) {
        this.addFoodToMapCart(food)
        this.storageService.setItemToLocalStorage(AppConstant.CART, this.mapCart);
        this.cartSubject.next(this.mapCart)
    }


    updateToCart(food: Food, quantity: number) {
        this.updateQuantityToMapCart(food, quantity)
        this.storageService.setItemToLocalStorage(AppConstant.CART, this.mapCart);
        this.cartSubject.next(this.mapCart)
    }



    deleteFromCart(food: Food) {
        this.removItemToMapCart(food)
        this.storageService.setItemToLocalStorage(AppConstant.CART, this.mapCart);
        this.cartSubject.next(this.mapCart)
    }

    addFoodToMapCart(food: Food) {
        let tmp = 0;
        this.mapCart = this.getCart();
        console.log(this.mapCart)
        if (this.mapCart.has(food.id)) {
            let currentQuantity = this.mapCart.get(food.id)?.quantity;
            let tmpFood = this.mapCart?.get(food?.id ?? 0);
            tmpFood?.quantity == undefined ? tmp : tmpFood.quantity = (currentQuantity == undefined ? 0 : (currentQuantity + 1));
            this.mapCart.set(food.id, tmpFood == undefined ? food : tmpFood);
        } else {
            food.quantity = 1;
            this.mapCart.set(food.id, food);
        }

    }

    updateQuantityToMapCart(food: Food, quantity: number) {
        let tmp = 0;
        this.mapCart = this.getCart();
        console.log(this.mapCart)
        if (this.mapCart.has(food.id)) {
            let currentQuantity = this.mapCart.get(food.id)?.quantity;
            let tmpFood = this.mapCart?.get(food?.id ?? 0);
            tmpFood?.quantity == undefined ? tmp : tmpFood.quantity = (currentQuantity == undefined ? 0 : + quantity);
            this.mapCart.set(food.id, tmpFood == undefined ? food : tmpFood);
        } else {
           //do something
        }

    }

    removItemToMapCart(food: Food) {
        this.mapCart = this.getCart();
        console.log(this.mapCart)
        if (this.mapCart.has(food.id)) {
            this.mapCart.delete(food.id);
            console.log("",this.mapCart)
        } else {
           //do something
        }

    }


    getCart(): Map<number, Food> {
        return this.storageService.getItemToLocalStorage(AppConstant.CART);
    }

    watchCartChange() {
        return this.cartSubject;
    }

    removeCart() {
        this.storageService.removeFromLocalStorage(AppConstant.CART);
    }

    getTotalPrice() : Map<string, number> {
        this.mapPrice = new Map<string, number>();
        this.mapPrice.set("total", 0);
        this.mapCart = this.getCart();
        this.mapCart.forEach((food: Food, foodId: number) => {
            if(!this.mapPrice.has(food.supplier.name)) {
                this.mapPrice.set(food.supplier.name, food.price * food.quantity);
            } else {
                let currentTotalPrice = this.mapPrice.get(food.supplier.name) == undefined ? 0 : this.mapPrice.get(food.supplier.name);
                currentTotalPrice = currentTotalPrice == undefined ? 0 : currentTotalPrice;
                this.mapPrice.set(food.supplier.name, (food.price * food.quantity) + currentTotalPrice);
            }
            let currentTotalPrice = this.mapPrice.get("total") == undefined ? 0 : this.mapPrice.get("total");
            currentTotalPrice = currentTotalPrice == undefined ? 0 : currentTotalPrice;
            this.mapPrice.set("total", (food.price * food.quantity) + currentTotalPrice)
        }) 
        return this.mapPrice;
    }

    

    divideOrderBySupplier() : Map<number, Food[]> {
        this.mapCart = this.getCart();
        let mapFood: Map<number, Food[]> = new Map<number, Food[]>();
        this.mapCart.forEach((food: Food, foodId: number) => {
            if(!mapFood.has(food.supplier.id)) {
                let foods: Food[] = [];
                foods.push(food)
                mapFood.set(food.supplier.id, foods);
            } else {
               let foods = mapFood.get(food.supplier.id);
               foods?.push(food);
               mapFood.set(food.supplier.id, foods == undefined ? new Array() : foods)
            }
        }) 
        return mapFood;
    }

}