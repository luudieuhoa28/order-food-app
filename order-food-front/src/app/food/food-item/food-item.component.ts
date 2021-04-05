import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterContentInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { CartService } from 'src/app/cart.service';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { Food } from 'src/app/model/food.model';
import { SupplierServive } from 'src/app/supplier.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, OnDestroy, AfterContentInit {

  foodForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required]
  })

  @Input() food: Food = new Food();
  @Input() isMine: boolean = false;
  isLogedIn: boolean = false;
  userRole: string = "";
  subcription = new Subscription();
  isEditing = false;
  @Input() isCreating = false;
  @Input() supplierId: number = 0;
  constructor(private cartService: CartService,
    private loginNotificateService: LoginNotificateService,
    private myLocalStorage: LocalStorageService,
    private fb: FormBuilder,
    private http: HttpClient,
    private supplierService: SupplierServive) { }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngAfterContentInit(): void {
    if (this.myLocalStorage.getDataToLocalStorage(AppConstant.CURRENT_USER_ID) != "") {
      this.isLogedIn = true;
      this.userRole = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    }
  }
  ngOnInit(): void {
    console.log("isCreating", this.isCreating)
    this.foodForm.patchValue({
      name: this.food.name,
      price: this.food.price
    })
    this.subcription = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.isLogedIn = isLogedIn;
      this.userRole = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
  }

  handleAddToCart() {
    this.cartService.addToCart(this.food);
  }

  submitForm() {
    console.log("creating", this.isCreating)
    console.log("editing", this.isEditing)
    let endpoint = "";
    if (this.isCreating) {
      endpoint = "http://localhost:8080/foods/supplier/create";
    }
    if (this.isEditing) {
      endpoint = "http://localhost:8080/foods/supplier/update";
    }

    let body = {
      id: this.isCreating ? null : this.food.id,
      name: this.foodForm.value.name,
      price: this.foodForm.value.price,
      supplier: {
        id: this.supplierId
      }
    }
    this.http.post(endpoint, body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.myLocalStorage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
        })
      }).subscribe(data => {
        if (this.isCreating) {
          this.supplierService.sendNotiFood("CREATED");
        } else {
          this.supplierService.sendNotiFood("UPDATED");
        }
      })

  }

  handleCancle() {
    this.isEditing = false;
    this.supplierService.sendNotiFood("CANCEL");
    this.foodForm.patchValue({
      name: this.food.name,
      price: this.food.price
    })
  }

  handleEdit() {
    this.isEditing = true;
  }

}
