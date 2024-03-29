export class Holiday {
    id : number | undefined;
    date : Date | string;
    description : string | undefined;

    constructor(data:any){
        this.id = data.id;
        this.date = data.attributes.date;
        this.description = data.attributes.description;
    }
}
