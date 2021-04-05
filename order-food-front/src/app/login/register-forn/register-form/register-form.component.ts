import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  message: string = "";
  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
   console.log(form) 
   console.log(form.invalid)
   let body: {} = {
    id: form.form.value.username,
    password: form.form.value.password,
    role:{
        id: +form.form.value.typeAcc
    }
   }

   const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
    this.http.post("http://localhost:8080/users/create",  JSON.stringify(body), httpOptions)
    .subscribe(data => {
      this.router.navigate(["/login"]);
    }, error => {
      if("EXISTED_USERNAME" == error.error.typeException){
        this.message = error.error.message
      }
    })

  }

}
