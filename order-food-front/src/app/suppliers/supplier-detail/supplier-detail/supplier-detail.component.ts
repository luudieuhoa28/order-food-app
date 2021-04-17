import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Supplier } from 'src/app/model/supplier.model';
import { Food } from 'src/app/model/food.model';
import { Feedback } from 'src/app/model/feedback.model';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { LocalStorageService } from 'src/app/local-storage.service';
import { AppConstant } from 'src/app/app-constant';
import { SupplierServive } from 'src/app/supplier.service';
import { DatePipe } from '@angular/common';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit, OnDestroy, AfterContentInit {

  id: number = 0;
  foods: Food[] = [];
  feedbacks: Feedback[] = [];
  isLogedIn: boolean = false;
  supplier: Supplier = new Supplier();
  subcription = new Subscription();
  supplierSubcription = new Subscription();
  commentSubcription = new Subscription();
  userRole: string = "";
  isMine = false;
  isCreating = false;
  clockIcon = faClock;
  phoneIcon = faPhone;
  mapIcon = faMapMarkerAlt;
  plusIcon = faPlus;
  constructor(private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private loginNotificateService: LoginNotificateService,
    private myLocalStorage: LocalStorageService,
    private supplierService: SupplierServive) { }

  ngAfterContentInit(): void {
    if (this.myLocalStorage.getDataToLocalStorage(AppConstant.CURRENT_USER_ID) != "") {
      this.isLogedIn = true;
      this.userRole = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    }
  }

  ngOnInit(): void {
    this.commentSubcription = this.supplierService.recieveNotiComment().subscribe(status => {
      this.fetchComment();
    })

    this.supplierSubcription = this.supplierService.recieveNotiFood().subscribe(status => {
      if (status == "CREATED") {
        this.fetchFood();
        this.isCreating = false;
      } else if (status == "UPDATED" ||
        status == "DELETE" ||
        status == "SOLD_OUT" ||
        status == "AVAILABLE") {
        this.fetchFood();

        this.isCreating = false;
      } else {
        this.isCreating = false;
      }
    })

    this.subcription = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.isLogedIn = isLogedIn;
      this.userRole = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
      this.isMine = this.supplier.user.id == this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID);
    })
    this.id = +this.activeRoute.snapshot.params['id'];
    this.activeRoute.params.subscribe(id => {
      this.http.get<Supplier>(`http://localhost:8080/suppliers/get/${this.id}`)
        .subscribe(data => {
          this.supplier = data;
          this.isMine = this.supplier.user.id == this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID);
          this.fetchFood();
          this.fetchComment();
        })
    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    this.supplierSubcription.unsubscribe();
    this.commentSubcription.unsubscribe();
  }

  submitComment(form: NgForm) {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.myLocalStorage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
      })
    }
    let body = {
      comment: form.form.value.comment,
      starRate: 0,
      time: formattedDate,
      customer: {
        id: this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      },
      supplier: {
        id: this.supplier.id
      }
    }
    this.http.post<{ [key: string]: string }>("http://localhost:8080/feedbacks/customersupplier/create",
      JSON.stringify(body), httpOptions).subscribe(data => {
        form.resetForm();
        this.fetchComment();
      })
    console.log(form.form.value.comment);
    console.log(form.invalid)
  }

  fetchComment() {
    this.http.get<Feedback[]>('http://localhost:8080/feedbacks/getBySupplierId',
      { params: new HttpParams().set("supplierId", this.supplier.id + "") })
      .subscribe(data => {
        this.feedbacks = data;
      })
  }

  fetchFood() {
    let status = "";
    if (this.isMine) {
      status = "SOLD_OUT";
    }
    this.http.get<Food[]>("http://localhost:8080/foods/getBySupplierId",
      {
        params: new HttpParams().set("supplierId", this.supplier.id + "")
          .set("status", status)
      })
      .subscribe(data => {
        this.foods = data;
        console.log("food", data)
      })
  }

  handleCreate() {
    this.isCreating = true;
  }


}
