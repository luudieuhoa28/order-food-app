import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { OrderService } from 'src/app/order.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  @Input() supplierId: number = 0;

  feedbackForm = this.fb.group({
    rateStar: [null, Validators.required],
    comment: ["", Validators.required]

  })

  constructor(private fb: FormBuilder, 
    private http: HttpClient, 
    private myLocalStorage: LocalStorageService,
    private orderService: OrderService) { }

  ngOnInit(): void {
  }

  submitForm() {
    const datepipe: DatePipe = new DatePipe('en-US')
    let formattedDate = datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.myLocalStorage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
      })
    }
    let body = {
      comment: this.feedbackForm.value.comment,
      starRate: this.feedbackForm.value.rateStar,
      time: formattedDate,
      customer: {
        id: this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID)
      },
      supplier: {
        id: this.supplierId
      }
    }
    this.http.post<{ [key: string]: string }>("http://localhost:8080/feedbacks/customersupplier/create",
      JSON.stringify(body), httpOptions).subscribe(data => {
        this.orderService.notiSentFb(true);
       console.log(data)
      })
  }

}
