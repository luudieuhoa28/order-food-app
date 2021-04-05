import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TextService {
    private subject = new Subject<string>();

    sendText(text: string) {
            this.subject.next(text);
    }

    getText() : Subject<string>{
        return this.subject;
    }
}