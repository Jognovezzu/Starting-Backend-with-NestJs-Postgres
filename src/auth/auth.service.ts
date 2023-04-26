import { Injectable, UnauthorizedException, UnprocessableEntityException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users';
import { UserRole } from 'src/users/user-roles.enum';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';




@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userService: UsersService,
        private jwtService: JwtService,
            ){}

    async singUp(createUserDTO:CreateUserDTO):Promise<User> {
        if (createUserDTO.password != createUserDTO.passwordConfirmation) {
            throw new UnprocessableEntityException('Senhas não conferem');

        }
        else{
            return this.userService.createUser(createUserDTO,UserRole.USER);
        }
    }

    async signIn(credentialsDTO:CredentialsDTO){
        const user = await this.userService.checkcredential(credentialsDTO);

        if (user === null){
            throw new UnauthorizedException('Dados de Login inválidos');
        }
        const jwtPayload = { id: user.id, };

        const token = await this.jwtService.sign(jwtPayload);

        return {token};
    }

    
}
