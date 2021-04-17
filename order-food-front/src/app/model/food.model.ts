import { Supplier } from "./supplier.model";

export class Food {
    public id: number = 0;
    public name: string = "";
    public price: number = 0;
    public quantity: number = 0;
    public status: string = "";
    public version: number = 0;
    public supplier: Supplier = new Supplier();
}