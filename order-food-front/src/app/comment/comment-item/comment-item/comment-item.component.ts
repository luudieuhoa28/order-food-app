import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AppConstant } from 'src/app/app-constant';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Feedback } from 'src/app/model/feedback.model';
import { SupplierServive } from 'src/app/supplier.service';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() feedback: Feedback = new Feedback();
  currentUserId = "";
  deleteIcon = faTrashAlt;
  constructor(private storage: LocalStorageService,
    private http: HttpClient,
    private supplierService: SupplierServive) { }

  ngOnInit(): void {
    this.currentUserId = this.storage.getDataToSessionStorage(AppConstant.CURRENT_USER_ID);
  }

  handleDelete() {
    if (confirm("You really want to delete this item?")) {
      this.http.delete("http://localhost:8080/feedbacks/customersupplier/delete",
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.storage.getDataToSessionStorage(AppConstant.JWT_TOKEN)}`
          }),
          params: new HttpParams().set("feedbackId", this.feedback.id + "")
        })
        .subscribe(data => {
          this.supplierService.sendNotiCommet("DELETE");
        })
    }
  }



}
