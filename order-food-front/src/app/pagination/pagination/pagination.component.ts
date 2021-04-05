import { Component, OnInit } from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handlePage(event?:PageEvent) {
      console.log("event", event)
  }
}
