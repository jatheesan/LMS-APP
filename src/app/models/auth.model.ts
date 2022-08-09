export class Auth {
    username : string | undefined;
    passwordHash : string | undefined;

    constructor(username: string, passwordHash : string){
        this.username = username;
        this.passwordHash = passwordHash;
    }
}
