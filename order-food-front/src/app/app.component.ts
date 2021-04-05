import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/text.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'order-food-application';
  constructor() { 

  }

  
  ngOnInit(): void {
  
  }
}
