import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Users } from 'src/app/model/users';

@Component({
  selector: 'app-change-user-infor-form',
  templateUrl: './change-user-infor-form.component.html',
  styleUrls: ['./change-user-infor-form.component.css']
})
export class ChangeUserInforFormComponent implements OnInit {


  changeInforForm = this.fb.group({
    username: [this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)],
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required]
  });

  isSuccess = false;
  user = new Users();
  constructor(private fb: FormBuilder,
    private http: HttpClient, 
    private storage: LocalStorageService) { }

  ngOnInit(): void {
    this.http.get<Users>("http://localhost:8080/users/get", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
      }),
      params: new HttpParams().set("userId", this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID))
    }).subscribe(data => {
      console.log("data", data)
      this.user = data;
      this.changeInforForm.patchValue({
        name: this.user.name,
        address: this.user.address,
        phone: this.user.phone
     });
    })
  }

  submitForm() {
    let body = {
      id: this.user.id,
      name: this.changeInforForm.value.name,
      address: this.changeInforForm.value.address,
      phone: this.changeInforForm.value.phone
    }
    this.http.put("http://localhost:8080/users/update", body,
    { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
    })}).subscribe(data => {
      this.isSuccess = true;
    })
  }

}
