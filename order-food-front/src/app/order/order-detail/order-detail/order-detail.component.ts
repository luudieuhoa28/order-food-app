import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { OrderDetail } from 'src/app/model/order-detail';
import { Orders } from 'src/app/model/orders';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

  orderDetails: OrderDetail[] = [];
  subcription: Subscription = new Subscription();
  subcriptionLogin: Subscription = new Subscription();
  totalMoney: number = 0;
  order: Orders = new Orders();
  role: string = "";
  feedbackSubcription = new Subscription();
  isSentFeedback = false;
  constructor(private orderService: OrderService,
    private http: HttpClient,
    private storage: LocalStorageService,
    private router: Router,
    private loginNotificateService: LoginNotificateService) { }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    this.subcriptionLogin.unsubscribe();
    this.feedbackSubcription.unsubscribe();

  }

  ngOnInit(): void {
    this.feedbackSubcription = this.orderService.recieveNotiSentFb().subscribe(isSent => {
      this.isSentFeedback = isSent;
   })
    this.subcriptionLogin = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.role = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
    this.subcription = this.orderService.getOrder().subscribe(order => {
      this.order = order;
      this.http.get<OrderDetail[]>("http://localhost:8080/orderDetail/customersupplier/getOrderDetailByOrderId",
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
          }),
          params: new HttpParams().set("orderId", order.id + "")
        })
        .subscribe(data => {
          this.orderDetails = data;
          this.totalMoney = 0;
          this.orderDetails.forEach(detail => {
            this.totalMoney = this.totalMoney + detail.food.price * detail.numOfDishes;
          })
        }, error => {
          console.log(error)
          if (error.error.status == 403) {
            this.router.navigate(["/login"])
          }
        })
    })
  }

}
