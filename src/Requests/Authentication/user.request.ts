
export class RegisterRequest {
    name: string;
    username: string;
    email: string;
    password: string;
    

    constructor(body:any){
        this.name = body.name;
        this.username = body.username;
        this.email = body.email;
        this.password = body.password
    }


    public isValid():{valid: boolean, errors: string[]}{
        const errors: string[]= [];

        if(!this.name || typeof this.name !== "string"){
            errors.push("Name is required and must be string");
        }

        if(!this.username || typeof this.username!=='string'){
            errors.push("Username is required and must be string");
        }
        
        if(!this.email || typeof this.email!=='string' || !this.email.includes('@')){
            errors.push("Email can't be empty and must be in formate example@example.com");
        }

        if(!this.password || typeof this.password !== 'string' || this.password.length <6){
            errors.push("Password must be greater than 6 characters");
        }

        return {
            valid: errors.length ===0,
            errors
        }
    }
}