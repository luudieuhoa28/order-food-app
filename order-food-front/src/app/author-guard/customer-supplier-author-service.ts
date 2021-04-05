import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AppConstant } from "../app-constant";
import { LocalStorageService } from "../local-storage.service";

@Injectable({providedIn: 'root'})
export class CustomerSupplierAuthGuard implements CanActivate {

     constructor(private myLocalStorage: LocalStorageService,
        private router: Router) {
         
     }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let userRole = this.myLocalStorage.getDataToSessionStorage(AppConstant.CURRENT_USER_ROLE);
      if( userRole == "SUPPLIER" || userRole == "CUSTOMER") {
          return true;
      }
      this.router.navigate(['/anonymous']);
      return false;
    }

}