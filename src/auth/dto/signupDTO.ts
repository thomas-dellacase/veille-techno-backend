import { IsNotEmpty, IsEmail } from "class-validator";

export class SignupDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    readonly droit: string;

    constructor(email: string, username: string, password: string, droit: string = "1") {
        this.email = email;
        this.username = username;
        this.password = password;
        this.droit = droit;
    }
}