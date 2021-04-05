import { Supplier } from "./supplier.model";
import { Users } from "./users";

export class Orders {
    public id: number = 0;
    public time: string = "";
    public supplier: Supplier = new Supplier();
    public customer: Users = new Users();
    public status: string = "";
}