import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-form',
  templateUrl: './food-form.component.html',
  styleUrls: ['./food-form.component.css']
})
export class FoodFormComponent implements OnInit {

  foodForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required]
  })
  isSuccess = false;
  action = "";
  constructor(private fb: FormBuilder,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.action = this.activeRoute.snapshot.params['typeAction'];
    this.activeRoute.params.subscribe(param => {
      this.action = param['typeAction'];
      
    })
  }

  submitForm() {

  }

}
