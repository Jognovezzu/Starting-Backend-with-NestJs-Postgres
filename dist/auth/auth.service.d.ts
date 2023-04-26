import { Repository } from 'typeorm';
import { User } from 'src/users';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private userService;
    private jwtService;
    constructor(userRepository: Repository<User>, userService: UsersService, jwtService: JwtService);
    singUp(createUserDTO: CreateUserDTO): Promise<User>;
    signIn(credentialsDTO: CredentialsDTO): Promise<{
        token: string;
    }>;
}
