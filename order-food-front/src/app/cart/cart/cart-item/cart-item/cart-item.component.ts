import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { Food } from 'src/app/model/food.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit{

  @Input() food: Food = new Food();
  constructor(private cartService: CartService) {}


  ngOnInit(): void {
  

  }

  deleteItemFromCart() {
    if(confirm("Are you sure to delete this?")){
      this.cartService.deleteFromCart(this.food);
    }
  }

  onChange(newValue: any) {
    const newQuantity = newValue.target.value;
    if(newQuantity != "") {
      this.cartService.updateToCart(this.food, +newQuantity)
    }
  }

}
