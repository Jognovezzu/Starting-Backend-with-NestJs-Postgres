import { Body, Controller, Post, Get, ValidationPipe, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport/dist';
import { User } from 'src/users';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {

    constructor(
        private authservice: AuthService){}


    @Post('/signup')
    async signUp(@Body(ValidationPipe) createUserDTO: CreateUserDTO,):Promise<{message:string}>{
        await this.authservice.singUp(createUserDTO);
        return{
            message:'Cadastro Realizado!!!',
        };
    }
    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentialsDTO: CredentialsDTO,):Promise<{token: string}>{
        return await this.authservice.signIn(credentialsDTO)
    }
    @Get('/me')
    @UseGuards(AuthGuard())
    getMe(@GetUser() user: User): User {
        return user;
  }
}
