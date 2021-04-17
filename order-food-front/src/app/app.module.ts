import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar/search-bar.component';
import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail/supplier-detail.component';
import { SupplierListComponent } from './suppliers/supplier-list/supplier-list/supplier-list.component';
import { HomeComponent } from './home/home/home.component';
import { SupplierItemComponent } from './suppliers/supplier-item/supplier-item/supplier-item.component';
import { HeaderComponent } from './header/header/header.component';
import { StorageServiceModule } from 'ngx-webstorage-service';
import { FoodItemComponent } from './food/food-item/food-item.component';
import { CommentItemComponent } from './comment/comment-item/comment-item/comment-item.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-forn/register-form/register-form.component';
import { CartComponent } from './cart/cart/cart.component';
import { CartItemComponent } from './cart/cart/cart-item/cart-item/cart-item.component';
import { AnonymousComponent } from './Unauthorization/anonymous/anonymous.component';
import { OrderPageComponent } from './order/order-page/order-page.component';
import { OrderItemComponent } from './order/order-item/order-item/order-item.component';
import { OrderDetailComponent } from './order/order-detail/order-detail/order-detail.component';
import { PaginationComponent } from './pagination/pagination/pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ChangeUserInforFormComponent } from './login/change-user-infor/change-user-infor-form/change-user-infor-form.component';
import { SupplierFormComponent } from './suppliers/supplier-form/supplier-form/supplier-form.component';
import { FoodFormComponent } from './food/food-form/food-form/food-form.component';
import { FeedbackComponent } from './feedback/feedback/feedback.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel/carousel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    SupplierDetailComponent,
    SupplierListComponent,
    HomeComponent,
    SupplierItemComponent,
    HeaderComponent,
    FoodItemComponent,
    CommentItemComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CartComponent,
    CartItemComponent,
    AnonymousComponent,
    OrderPageComponent,
    OrderItemComponent,
    OrderDetailComponent,
    PaginationComponent,
    ChangeUserInforFormComponent,
    SupplierFormComponent,
    FoodFormComponent,
    FeedbackComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    StorageServiceModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
