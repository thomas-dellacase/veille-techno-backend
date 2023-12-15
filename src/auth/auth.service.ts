import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signupDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService) {}

    async signup(signupDTO: SignupDTO) {
        const { email, username, password, droit } = signupDTO;
        const user = await this.prismaService.users.findUnique({ where: { email } });
        
        if (user) {
            throw new ConflictException('User already exists');
        }

        const hash = await bcrypt.hash(password, 10);
        await this.prismaService.users.create({
            data: {
                email,
                username,
                password: hash,
                droit // Include droit obtained from the DTO
            }
        });
        
        return { data: 'User created ma couille' };
    }
}