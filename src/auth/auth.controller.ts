import { Controller, Post } from '@nestjs/common'
import {Body} from "@nestjs/common/decorators"
import { AuthService } from './auth.service'
import { SignupDTO } from './dto/signupDTO'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    signup(@Body() signupDTO : SignupDTO){
        return this.authService.signup(signupDTO)
    }
}
