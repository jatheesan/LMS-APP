export class CalendarDate {
    public date : Date | undefined;
    public isThisMonth : boolean | undefined;

    constructor(date : Date, isThisMonth : boolean){
        this.date = date;
        this.isThisMonth = isThisMonth;
    }
}
