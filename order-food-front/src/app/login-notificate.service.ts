import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class LoginNotificateService {
    private subject = new BehaviorSubject<boolean>(false);

    sendNotification(isLogedIn: boolean) {
        this.subject.next(isLogedIn);
    }

    recieveNotification() {
        return this.subject;
    }

}