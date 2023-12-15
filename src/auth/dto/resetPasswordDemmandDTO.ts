import { IsNotEmpty, IsEmail } from "class-validator";

export class ResetPasswordDemandDTO {
    @IsEmail()
    readonly email: string;

}