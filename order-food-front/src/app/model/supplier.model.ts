import { Food } from "./food.model";
import { Users } from "./users";

export class Supplier {
    public id: number = 0;
    public name: string = "";
    public address: string = "";
    public openTime: string = "";
    public closeTime: string = "";
    public rate: number = 0;
    public phone: string = "";
    public foods: Food[] = [];
    public feedbackIds: number[] = [];
    public user: Users = new Users();
    constructor() {
    }

    
}