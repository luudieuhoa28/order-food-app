import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Orders } from 'src/app/model/orders';
import { Supplier } from 'src/app/model/supplier.model';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterContentInit {


  orders: Orders[] = [];
  status = "PENDING";
  role: string = "";
  suppliers: Supplier[] = [];
  currentSupplier: number = 0;
  statusOrderSubcription= new Subscription();
  displayDetail = true;
  feedbackSupplierId = 0;
  constructor(private http: HttpClient,
    private storage: LocalStorageService, 
    private orderService: OrderService) { }

  ngAfterContentInit(): void {
    this.getOrders();
  }
  ngOnDestroy(): void {
    this.statusOrderSubcription.unsubscribe();
  }

  ngOnInit(): void {
   

    this.getOrders();
    this.statusOrderSubcription = this.orderService.recieveUpdatedStatus().subscribe(newStatus => {
      this.getOrders();
    })
  }

  getOrders() {
    this.role = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    let endpoint = '', param = '';
    if (this.role == "CUSTOMER") {
      endpoint = "http://localhost:8080/orders/customer/getByCustomerIdAndStatus";
      param = "customerId";
      let userId = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      this.getOrdersByRole(endpoint, param, userId);
    } else if (this.role == "SUPPLIER") {
      endpoint = "http://localhost:8080/orders/supplier/getBySupplierIdAndStatus";
      param = "supplierId";
      let userId = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      this.http.get<Supplier[]>("http://localhost:8080/suppliers/getByUserId",
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
          }),
          params: new HttpParams().set("userId", userId)
            .set("status", status)
        }).subscribe(data => {
          this.suppliers = data;
          if (this.suppliers.length > 0) {
            if (this.storage.getDataToSessionStorage(AppConstant.CURRENT_SUPPLIER) != "") {
              this.currentSupplier = this.storage.getDataToSessionStorage(AppConstant.CURRENT_SUPPLIER);
            } else {
              this.currentSupplier = this.suppliers[0].id;
              this.storage.setDataToSessionStorage(AppConstant.CURRENT_SUPPLIER, this.currentSupplier);
            }
            this.getOrdersByRole(endpoint, param, this.currentSupplier + "")
          }
          console.log("suppliers", data)
        })


    }
  }


  getOrdersByRole(endpoint: string, paramName: string, paramValue: string) {
    this.http.get<Orders[]>(endpoint,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
        }),
        params: new HttpParams().set(paramName, paramValue)
          .set("status", this.status)
      }).subscribe(data => {
        this.orders = data;
        console.log("order", data)
      })
  }

  clickPending() {
    this.status = "PENDING";
    this.getOrders()
    this.orderService.sendOrder(new Orders())
  }

  clickWaiting() {
    this.status = "WAITING";
    this.getOrders()
    this.orderService.sendOrder(new Orders())
  }

  clickDone() {
    this.status = "DONE";
    this.getOrders()
    this.orderService.sendOrder(new Orders())
  }

  clickReject() {
    this.status = "REJECT";
    this.getOrders()
    this.orderService.sendOrder(new Orders())
  }

  handleSelectSupplier(event: any) {
    this.orderService.sendOrder(new Orders())
    let endpoint = "http://localhost:8080/orders/supplier/getBySupplierIdAndStatus";
    let param = "supplierId";
    if (event.target.checked) {
      this.currentSupplier = event.target.value;
      this.storage.setDataToSessionStorage(AppConstant.CURRENT_SUPPLIER, this.currentSupplier);
      this.getOrdersByRole(endpoint, param, this.currentSupplier + "")
    }
  }

}
