import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signupDTO';

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
}