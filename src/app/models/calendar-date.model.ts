export class CalendarDate {
    public date : Date | undefined;
    public isThisMonth : boolean | undefined;
    public isToday : boolean | undefined;

    constructor(date : Date, isThisMonth : boolean, isToday: boolean){
        this.date = date;
        this.isThisMonth = isThisMonth;
        this.isToday = isToday
    }
}
