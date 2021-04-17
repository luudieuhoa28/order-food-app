import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Orders } from "./model/orders";

@Injectable({ providedIn: 'root' })
export class OrderService {
    private subject = new Subject<Orders>();
    private subjectUpdateStatus = new Subject<string>();
    private subjectFeedback = new Subject<boolean>();

    sendOrder(order: Orders) {
        this.subject.next(order);
    }

    getOrder(): Subject<Orders> {
        return this.subject;
    }

    updateStatus(status: string) {
        this.subjectUpdateStatus.next(status);
    }

    recieveUpdatedStatus(): Subject<string> {
        return this.subjectUpdateStatus;
    }

    notiSentFb(isSent: boolean) {
        this.subjectFeedback.next(isSent);
    }

    recieveNotiSentFb(): Subject<boolean> {
        return this.subjectFeedback;
    }


}