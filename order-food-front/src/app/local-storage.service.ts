import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Food } from './model/food.model';


@Injectable({providedIn: 'root'})
export class LocalStorageService {
     constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService,
     @Inject(SESSION_STORAGE) private sessionStorage: StorageService) { }

     setDataToLocalStorage(name: string, data: any) {
        this.localStorage.set(name, data);
     }

     getDataToLocalStorage(name: string): any {
         if(this.localStorage.get(name) != undefined) {
            return this.localStorage.get(name);
         }
        return "";
     }

     removeFromLocalStorage(name: string ) {
        this.localStorage.remove(name);
     }


     setDataToSessionStorage(name: string, data: any) {
      this.sessionStorage.set(name, data);
   }

   getDataToSessionStorage(name: string): any {
       if(this.sessionStorage.get(name) != undefined) {
          return this.sessionStorage.get(name);
       }
      return "";
   }

   removeFromSessionStorage(name: string ) {
      this.sessionStorage.remove(name);
   }


   setItemToLocalStorage(name: string, data:Map<number, Food>) {
      console.log("datane", data)
      let tmp = JSON.stringify(Array.from(data.entries()));
      console.log(tmp)
      this.localStorage.set(name, JSON.stringify(Array.from(data.entries())));
   }

   getItemToLocalStorage(name: string): Map<number, Food> {
       if(this.localStorage.get(name) != undefined) {
          return new Map(JSON.parse(this.localStorage.get(name)));
       }
      return new Map<number, Food>();
   }

   removeAllSessionStorage() {
      // this.localStorage.clear();
      this.sessionStorage.clear();
   }




}