import { AfterContentInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterContentInit {


  subcription = new Subscription();
  isLogedIn: boolean = false;
  role: string = "";
  typeAction = "create"
  constructor(private loginNotificateService: LoginNotificateService,
    private myLocalStorage: LocalStorageService) { }
    
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngAfterContentInit(): void {
    if (this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID) != "") {
      this.isLogedIn = true;
    }
  }

  ngOnInit(): void {
    this.subcription = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.isLogedIn = isLogedIn;
      this.role = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
  }

}
