import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAuthGuard } from './author-guard/customer-author-service';
import { CustomerSupplierAuthGuard } from './author-guard/customer-supplier-author-service';
import { SupplierAuthGuard } from './author-guard/supplier-author-service';
import { CartComponent } from './cart/cart/cart.component';
import { FoodFormComponent } from './food/food-form/food-form/food-form.component';
import { HomeComponent } from './home/home/home.component';
import { ChangeUserInforFormComponent } from './login/change-user-infor/change-user-infor-form/change-user-infor-form.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-forn/register-form/register-form.component';
import { OrderPageComponent } from './order/order-page/order-page.component';
import { SupplierDetailComponent } from './suppliers/supplier-detail/supplier-detail/supplier-detail.component';
import { SupplierFormComponent } from './suppliers/supplier-form/supplier-form/supplier-form.component';
import { AnonymousComponent } from './Unauthorization/anonymous/anonymous.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "supplier/:id", component: SupplierDetailComponent },
  { path: "login", component: LoginFormComponent },
  { path: "register", component: RegisterFormComponent },
  { path: "cart", canActivate: [CustomerAuthGuard], component: CartComponent },
  { path: "order",  canActivate: [CustomerSupplierAuthGuard],component: OrderPageComponent },
  { path: "anonymous", component: AnonymousComponent },
  { path: "changeInfor", canActivate: [CustomerSupplierAuthGuard], component: ChangeUserInforFormComponent },
  { path: "suppliers/:typeAction", canActivate: [SupplierAuthGuard], component: SupplierFormComponent },
  { path: "food/:typeAction", canActivate: [SupplierAuthGuard], component: FoodFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
