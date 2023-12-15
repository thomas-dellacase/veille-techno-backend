import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signupDTO';
import { SigninDTO } from './dto/signinDTO';
import { ResetPasswordDemandDTO } from './dto/resetPasswordDemmandDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupData: SignupDTO) {
        if (!signupData.email || !signupData.username || !signupData.password) {
            throw new ConflictException('Missing required fields');
        }

        return await this.authService.signup(signupData);
    }

    @Post('signin')
    signin(@Body() signinDTO: SigninDTO) {
        return this.authService.signin(signinDTO);
    }

    @Post("reset-password")
    resetPasswordDemand(@Body() resetPasswordDemandDTO : ResetPasswordDemandDTO){
        return this.authService.resetPasswordDemand(resetPasswordDemandDTO);
    }
}