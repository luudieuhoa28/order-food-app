import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class SupplierServive {
    deleteSubject = new Subject<number>();
    foodSubject = new Subject<string>();
    commentSubject = new Subject<string>();

    sendNotiDelete(supplierId: number) {
        this.deleteSubject.next(supplierId);
    }

    recieveIdDelete(): Subject<number> {
        return this.deleteSubject;
    }

    sendNotiFood(status: string) {
        this.foodSubject.next(status);
    }

    recieveNotiFood(): Subject<string> {
        return this.foodSubject;
    }

    sendNotiCommet(status: string) {
        this.commentSubject.next(status);
    }

    recieveNotiComment(): Subject<string> {
        return this.commentSubject;
    }
}