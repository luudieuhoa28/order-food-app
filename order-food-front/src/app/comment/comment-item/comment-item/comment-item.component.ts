import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/feedback.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {

  @Input() feedback: Feedback = new Feedback();
  constructor() { }

  ngOnInit(): void {
  }

}
