import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Supplier } from 'src/app/model/supplier.model';

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
    openTime: [{}, Validators.required],
    closeTime: [{}, Validators.required]
  })
  isSuccess = false;
  header = "";
  action = "";
  message = "";
  existedNameMessage = "";
  supplierId = 0;
  supplier = new Supplier();
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
      if (this.action == 'create') {
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
      id: this.action == 'create' ? null : this.supplierId,
      name: this.supplierForm.value.name,
      address: this.supplierForm.value.address,
      phone: this.supplierForm.value.phone,
      openTime: this.supplierForm.value.openTime.hour + ":" +
        this.supplierForm.value.openTime.minute,
      closeTime: this.supplierForm.value.closeTime.hour + ":" +
        this.supplierForm.value.closeTime.minute,
      user: {
        id: this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      },
      version: this.supplier.version
    };
    let endpoint = "http://localhost:8080/suppliers/supplier/" + this.action;
    this.http.post(endpoint,
      body,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
        })
      }).subscribe(data => {
        this.existedNameMessage = "";
        this.isSuccess = true;
      }, error => {
        this.isSuccess = false;
        console.log(error)
        if(error.error.typeException == 'SUPPLIER_NAME_EXISTED') {
          this.existedNameMessage = error.error.message;
        } 
        if(error.error.typeException == 'OPTIMISTIC_LOCKING') {
          alert(error.error.message);
          this.getSupplier();
        }
      })
  }

  getSupplier() {
    this.http.get<Supplier>(`http://localhost:8080/suppliers/get/${this.supplierId}`).subscribe(data => {
      console.log(data);
      this.supplier = data;
      let openTimeArr = data.openTime.split(':');
      let closeTimeArr = data.closeTime.split(':');
      console.log(openTimeArr)
      console.log(closeTimeArr)
    
      this.supplierForm.patchValue({
        name: data.name,
        address: data.address,
        phone: data.phone,
        openTime: { hour: +openTimeArr[0], minute: +openTimeArr[1] },
        closeTime: { hour: +closeTimeArr[0], minute: +openTimeArr[1] },
      })

      console.log( this.supplierForm)
    })
  }



}
