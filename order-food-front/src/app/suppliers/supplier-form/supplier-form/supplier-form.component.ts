import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'app-supplier-form',
  templateUrl: './supplier-form.component.html',
  styleUrls: ['./supplier-form.component.css']
})
export class SupplierFormComponent implements OnInit {

  supplierForm = this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    openTime: ['', Validators.required],
    closeTime: ['', Validators.required]
  })
  isSuccess = false;
  header = "";
  action = "";
  message = "";
  existedNameMessage = "";
  supplierId = 0;
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private storage: LocalStorageService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.supplierId = this.activeRoute.snapshot.queryParams['supplierId'];
    this.getSupplier();
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.supplierId = queryParams['supplierId'];
    })

    this.action = this.activeRoute.snapshot.params['typeAction'];
    this.activeRoute.params.subscribe(param => {
      this.action = param['typeAction'];
      if(this.action == 'create') {
        this.header = "Create Supplier Form";
        this.message = "Create successfully";
      } else {
        this.header = "Update Supplier Form";
        this.message = "Update successfully";

      }
    })
  }

  submitForm() {
    let body = {
      id: this.action == 'create'? null: this.supplierId,
      name: this.supplierForm.value.name,
      address: this.supplierForm.value.address,
      phone: this.supplierForm.value.phone,
      openTime: this.supplierForm.value.openTime,
      closeTime: this.supplierForm.value.closeTime, 
      user: {
        id: this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      }
    };
    let endpoint = "http://localhost:8080/suppliers/supplier/" + this.action;
    this.http.post(endpoint,
       body, 
       { headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
    })}).subscribe(data => {
      this.existedNameMessage = "";
      this.isSuccess = true;
    }, error => {
      this.existedNameMessage = error.error.message;
    })
  }

  getSupplier() {
    this.http.get<{[key: string]: any}>(`http://localhost:8080/suppliers/get/${this.supplierId}`).subscribe(data => {
      console.log(data);
      this.supplierForm.patchValue({
        name: data.name,
        address: data.address,
        phone: data.phone,
        openTime: data.openTime,
        closeTime: data.closeTime, 
      })
    })
  }



}
