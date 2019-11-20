import { Observable } from "tns-core-modules/data/observable";

export class HomeViewModel extends Observable {
    public repeaterItems = 'x'.repeat(100).split('').map((el, i) => `LONG LONG LABEL ${i}`);
    constructor() {
        super();
        //this.repeaterItems = 
    }
}
