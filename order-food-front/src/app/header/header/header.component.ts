import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy, AfterContentInit {


  subcription = new Subscription();
  isLogedIn: boolean = false;
  role: string = "";
  constructor(private loginNotificateService: LoginNotificateService,
    private myLocalStorage: LocalStorageService) { }

  ngAfterContentInit(): void {
    if (this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID) != "") {
      this.isLogedIn = true;
    }
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  ngOnInit(): void {
    this.subcription = this.loginNotificateService.recieveNotification().subscribe(isLogedIn => {
      this.isLogedIn = isLogedIn;
      this.role = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
    })
  }

  logout() {
    this.isLogedIn = false;
    this.loginNotificateService.sendNotification(false);
    this.myLocalStorage.removeAllSessionStorage();
    location.reload()
  }

}
