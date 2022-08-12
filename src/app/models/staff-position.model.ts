export class StaffPosition {
    id : number | undefined;
    position : string | undefined;

    constructor(data:any){
        this.id = data.id;
        this.position = data.attributes.position;
    }
}
