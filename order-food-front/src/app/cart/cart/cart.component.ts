import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart.service';
import { Food } from 'src/app/model/food.model';
import { Orders } from 'src/app/model/orders';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AppConstant } from 'src/app/app-constant';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy, AfterContentInit {
  mapCart: Map<number, Food> = new Map;
  subcription = new Subscription();
  order: Orders[] = [];
  mapPrice: Map<string, number> = new Map<string, number>();
  constructor(private cartService: CartService,
    private http: HttpClient, 
    private myLocalStorage: LocalStorageService) {
  }
  ngAfterContentInit(): void {
    this.mapPrice = this.cartService.getTotalPrice();
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnInit(): void {
    this.mapCart = this.cartService.getCart();
    this.subcription = this.cartService.watchCartChange().subscribe(data => {
      this.mapCart = data;
      this.mapPrice = this.cartService.getTotalPrice();
    });
  }

  submitOrder() {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.myLocalStorage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
      })
    }

    let mapFood: Map<number, Food[]> = this.cartService.divideOrderBySupplier();
    mapFood.forEach((foods: Food[], supplierId: number) => {
      let orderDetails: {}[] = [];
      foods.forEach(myFood => {
        let detail = {
          numOfDishes: myFood.quantity,
          food: {
            id: myFood.id
          }
        }
        orderDetails.push(detail)
      })
      let body = {
        time: formattedDate,
        supplier: {
          id: supplierId
        }, 
        customer: {
          id: this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
        },
        orderDetails
      }

      console.log("body", JSON.stringify(body) )
      this.http.post("http://localhost:8080/orders/customer/create", JSON.stringify(body), httpOptions)
      .subscribe(data => {
        console.log("ordered", data)
        this.cartService.removeCart();
        this.mapCart = this.cartService.getCart();
      }, error => {
        console.log("error", error)
      })

    })
    console.log("cart", this.mapCart)
  }

}
