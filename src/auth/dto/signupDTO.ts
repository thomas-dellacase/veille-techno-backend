import { IsNotEmpty, IsEmail, IsOptional } from "class-validator";

export class SignupDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;

    @IsOptional()
    readonly droit?: string; // Make it optional

    constructor(email: string, username: string, password: string, droit?: string) {
        this.email = email;
        this.username = username;
        this.password = password;
        this.droit = droit !== undefined && droit !== '' ? droit : "1"; // Set the default value only if droit is not provided or empty
    }
}