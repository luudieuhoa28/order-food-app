import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { Supplier } from 'src/app/model/supplier.model';
import { SupplierServive } from 'src/app/supplier.service';

@Component({
  selector: 'app-supplier-item',
  templateUrl: './supplier-item.component.html',
  styleUrls: ['./supplier-item.component.css']
})
export class SupplierItemComponent implements OnInit {
  @Input() supplier = new Supplier();

  currentUserId = "";
  subcription = new Subscription();
  constructor(private storage: LocalStorageService,
    private loginNotification: LoginNotificateService,
    private http: HttpClient,
    private supplierService: SupplierServive,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.supplier)
    console.log(this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID))
    this.currentUserId = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
    this.subcription = this.loginNotification.recieveNotification().subscribe(isLogin => {
      this.currentUserId = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
    })
  }

  delete() {
    if (confirm("Are you sure to delete this?")) {
      let body = {
        id: this.supplier.id,
        status: "DELETE"
      };
      this.http.post("http://localhost:8080/suppliers/supplier/update",
        body,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
          })
        }).subscribe(data => {
          console.log(data)
          this.supplierService.sendNotiDelete(this.supplier.id);
        })
    }
  }

  handleViewDetail() {
    this.router.navigate([`/supplier/${this.supplier.id}`])
  }


}
