export class Feedback{
    public id: number = 0;
    public comment: string = "";
    public rate: number = 0;
    public time: string = "";
    public customer: {id: string, name: string} = {id: "", name: ""};
    public supplier: {id: number} = {id: 0}
}