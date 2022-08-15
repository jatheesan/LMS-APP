export class Team {
    id : number;
    teamName : string;
    primaryTeamId : number | undefined = null as any;
    description : string;

    constructor(data: any){
        this.id = data.id;
        this.teamName = data.attributes.teamName;
        this.primaryTeamId = data.attributes.primaryTeamId;
        this.description = data.attributes.description;
    }
}
