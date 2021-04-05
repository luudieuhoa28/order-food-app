import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { LoginNotificateService } from 'src/app/login-notificate.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  usernameText: string = "";
  passwordText: string = "";
  message: string = "";
  constructor(private http: HttpClient,
    private myLocalStorage: LocalStorageService,
    private route: Router,
    private loginNotificaService: LoginNotificateService) { }

  ngOnInit(): void {
  }

  onClickLogin(form: NgForm) {
    let body: {} = {
      username: form.value.username,
      password: form.value.password
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    this.http.post<{ [key: string]: string }>("http://localhost:8080/authenticate",
      JSON.stringify(body), httpOptions
    ).subscribe(data => {
        this.myLocalStorage.setDataToSessionStorage(AppConstant.JWT_TOKEN, data.jwt)
        this.myLocalStorage.setDataToSessionStorage(AppConstant.CURRENT_USER_ID, data.username)
        this.myLocalStorage.setDataToSessionStorage(AppConstant.CURRENT_USER_ROLE, data.role)
        this.loginNotificaService.sendNotification(true);
        this.route.navigate(['/']);   
       

    }, error => {
      this.message = error.error.message;

    })
    console.log(this.usernameText, this.passwordText)
  }

}
