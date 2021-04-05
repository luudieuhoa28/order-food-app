import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Orders } from "./model/orders";

@Injectable({providedIn: 'root'})
export class OrderService {
    private subject = new Subject<Orders>();
    private subjectUpdateStatus = new Subject<string>();

    sendOrder(order: Orders) {
            this.subject.next(order);
    }

    getOrder() : Subject<Orders>{
        return this.subject;
    }

    updateStatus(status: string) {
        this.subjectUpdateStatus.next(status);
    } 

    recieveUpdatedStatus() : Subject<string>{
        return this.subjectUpdateStatus;
    }
}