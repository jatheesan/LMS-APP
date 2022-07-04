export class CalendarDate {
    public date : Date | undefined;
    public is_thismonth : boolean | undefined;

    constructor(date : Date, is_thismonth : boolean){
        this.date = date;
        this.is_thismonth = is_thismonth;
    }
}
