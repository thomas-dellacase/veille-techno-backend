import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDTO } from './dto/signupDTO'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private readonly prismaService: PrismaService){}
    async signup(signupDTO: SignupDTO){
        const {email, username, password, droit} = signupDTO
        const user = await this.prismaService.users.findUnique({where : {email}})
        if(user) throw new ConflictException('user allready exist')
        const hash = await bcrypt.hash(password, 10)
        await this.prismaService.users.create({
            data: {email, username, password:hash, droit}
        })
        return {data : "User created"}
    }
}
