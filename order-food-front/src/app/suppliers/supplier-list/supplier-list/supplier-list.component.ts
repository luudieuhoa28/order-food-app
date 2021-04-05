import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { TextService } from 'src/app/text.service';
import { PageEvent } from '@angular/material/paginator';
import { PageInformation } from 'src/app/model/page.model';
import { LoginNotificateService } from 'src/app/login-notificate.service';
import { SupplierServive } from 'src/app/supplier.service';

const DEFAULT_PAGE_SIZE: number = 2;

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit, OnDestroy {

  suppliers = [];
  page: PageInformation = new PageInformation();
  subcription = new Subscription();
  currentText = "";
  subcriptionLogin = new Subscription();
  isLogedIn: boolean = false;
  role: string = "";
  isMine = false;
  userId = "";
  deleteSubcription = new Subscription();
  constructor(private http: HttpClient,
    private textService: TextService,
    private myLocalStorage: LocalStorageService,
    private loginNotificateService: LoginNotificateService,
    private supplierService: SupplierServive) { }

  ngAfterContentInit(): void {
    if (this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID) != "") {
      this.isLogedIn = true;
    }
  }

  ngOnInit(): void {

    this.isMine = this.myLocalStorage.getDataToSessionStorage(AppConstant.IS_MINE_CHECKED);
    if (this.isMine != true) {
      this.isMine = false;
    } else {
      this.userId = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID);
    }

    this.deleteSubcription = this.supplierService.recieveIdDelete().subscribe(supplierId => {
      this.searchRequest(this.currentText, this.page.pageIndex, DEFAULT_PAGE_SIZE, this.userId)
    })

    this.subcriptionLogin = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.isLogedIn = isLogedIn;
      this.role = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
    let currentPage = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_PAGE);
    if (currentPage != "") {
      this.page.pageIndex = +currentPage;
    } else {
      this.page.pageIndex = 0;
    }
    this.page.pageSize = DEFAULT_PAGE_SIZE;
    this.page.length = 0;
    let defaultTextSearch = this.myLocalStorage.getDataToSessionStorage(AppConstant.TEXT_SEARCH_SUPPLIER);
    this.currentText = defaultTextSearch;
    this.searchRequest(defaultTextSearch, this.page.pageIndex, DEFAULT_PAGE_SIZE, this.userId);
    this.subcription = this.textService.getText().subscribe(text => {
      console.log(text)
      this.currentText = text;
      this.searchRequest(text, 0, DEFAULT_PAGE_SIZE, this.userId);
      this.page.pageIndex = 0;
      this.page.pageSize = DEFAULT_PAGE_SIZE;
      this.myLocalStorage.setDataToSessionStorage(AppConstant.CURRENT_PAGE, this.page.pageIndex);
    })
  }


  ngOnDestroy(): void {
    this.subcription.unsubscribe();
    this.subcriptionLogin.unsubscribe();
    this.deleteSubcription.unsubscribe();
  }

  handlePage(event?: PageEvent) {
    console.log("event", event)
    this.page.pageIndex = event?.pageIndex == undefined ? 0 : event.pageIndex;
    this.page.pageSize = event?.pageSize == undefined ? 0 : event.pageSize;
    this.searchRequest(this.currentText, this.page.pageIndex, DEFAULT_PAGE_SIZE, this.userId);
    this.myLocalStorage.setDataToSessionStorage(AppConstant.CURRENT_PAGE, this.page.pageIndex);
  }


  searchRequest(searchTerm: string, pageNumber: number, pageSize: number, userId: string) {
    this.http.get<{ [key: string]: any }>("http://localhost:8080/suppliers/searchByTerm",
      {
        params: new HttpParams().set('term', searchTerm)
          .set("pageNumber", pageNumber + "")
          .set("pageSize", pageSize + "")
          .set("userId", userId)
      }).subscribe(data => {
        this.suppliers = data.listItem;
        this.page.length = data.totalItem;
        this.page.pageSize = data.pageable.pageSize;
        this.page.pageIndex = data.pageable.pageNumber;
        this.myLocalStorage.setDataToSessionStorage(AppConstant.CURRENT_PAGE, this.page.pageIndex);
      })
  }

  checkIsMine(event: any) {
    if (event.target.checked) {
      this.userId = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      this.myLocalStorage.setDataToSessionStorage(AppConstant.IS_MINE_CHECKED, true)
    } else {
      this.userId = "";
      this.myLocalStorage.setDataToSessionStorage(AppConstant.IS_MINE_CHECKED, false)
    }

    this.searchRequest(this.currentText,
      0,
      DEFAULT_PAGE_SIZE,
      this.userId);
    console.log(event)
  }
}
