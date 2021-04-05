import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { Orders } from 'src/app/model/orders';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {

  @Input() order: Orders = new Orders();
  role: string = "";
  subcription = new Subscription();
  constructor(private orderService: OrderService,
    private loginNotificateService: LoginNotificateService,
    private myLocalStorage: LocalStorageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.subcription = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.role = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
  }

  handleViewDetail() {
    this.orderService.sendOrder(this.order)
  }

  handleReject() {
    this.updateStatus("REJECT");
  }

  handleCancel() {
    this.updateStatus("DELETE");
  }

  handleAccept() {
    this.updateStatus("WAITING");
  }

  handleRecieved() {
    this.updateStatus("DONE");
  }

  handleFeedback() {

  }

  updateStatus(status: string) {
    let param = new HttpParams();
    param.set("orderId", this.order.id + "");
    param.append("newStatus", status)
    // , params: param
    this.http.get("http://localhost:8080/orders/customersupplier/updateStatus",
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.myLocalStorage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
        })
        , params:  new HttpParams().set("orderId", this.order.id + "").set("newStatus", status)
      }).subscribe(data => {
        this.orderService.updateStatus(status);
      })
  }

}
