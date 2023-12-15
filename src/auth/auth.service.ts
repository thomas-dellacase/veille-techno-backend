import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signupDTO';
import { SigninDTO } from './dto/signinDTO';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordDemandDTO } from './dto/resetPasswordDemmandDTO';
import * as speakeasy from 'speakeasy'
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class AuthService {

  constructor(
    private readonly prismaService: PrismaService,
    private readonly JwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: MailerService
  ) {}

  async signup(signupDTO: SignupDTO) {
    const { email, username, password, droit } = signupDTO;
    const user = await this.prismaService.users.findUnique({
      where: { email },
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.users.create({
      data: {
        email,
        username,
        password: hash,
        droit, // Include droit obtained from the DTO
      },
    });

    await this.emailService.sendSignupConfirmation(email)

    return { data: 'User created ma couille' };
  }

  async signin(signinDTO: SigninDTO) {
    const { email, password } = signinDTO;

    const user = await this.prismaService.users.findUnique({
      where: { email },
    });
    if (!user) throw new NotFoundException('User not found ma couilles');

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      throw new UnauthorizedException('Password do not match ma couilles');

    const payload = {
      sub: user.uid,
      email: user.email,
    };
    const token = this.JwtService.sign(payload, {
      expiresIn: '4h',
      secret: this.configService.get('SECRET_KEY'),
    });
    return {
        token,
        user: {
            username: user.username,
            email: user.email,
        }
    };
  }

  async resetPasswordDemand(resetPasswordDemandDTO: ResetPasswordDemandDTO) {

    const {email} = resetPasswordDemandDTO;

    const user = await this.prismaService.users.findUnique({
        where: { email },
      });
      if (!user) throw new NotFoundException('User not found ma couilles');
      const code = speakeasy.totp({
        secret : this.configService.get("OTP_CODE"),
        digits : 5,
        step : 60 * 20,
        encoding: 'base32'
      })
      const url = "http://localhost:3000/auth/reset-password-confirmation"

}
}
