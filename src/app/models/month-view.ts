import { CalendarDate } from "./calendar-date.model";
export class MonthView {
    rowoffsets : number[];
    days : CalendarDate[];
    totalDaysVisibleInWeek : number;

    constructor(rowoffsets : number[], days : CalendarDate[], totalDaysVisibleInWeek : number){
        this.rowoffsets = rowoffsets;
        this.days = days;
        this.totalDaysVisibleInWeek = totalDaysVisibleInWeek
    }
}