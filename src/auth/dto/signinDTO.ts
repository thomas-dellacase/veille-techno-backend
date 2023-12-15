import { IsNotEmpty, IsEmail } from "class-validator";

export class SigninDTO {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;

}