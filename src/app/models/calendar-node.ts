import { CalendarDate } from "./calendar-date.model";

export class CalendarNode<T> {
    insertInBegin(arg0: CalendarDate) {
      throw new Error('Method not implemented.');
    }
    traverse(): any {
      throw new Error('Method not implemented.');
    }
    public next: CalendarNode<T> | null = null;
    public prev: CalendarNode<T> | null = null;

    constructor(public data:T)
    {

    }
}
