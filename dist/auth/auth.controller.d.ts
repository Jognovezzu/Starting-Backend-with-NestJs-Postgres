import { AuthService } from './auth.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { CredentialsDTO } from 'src/users/dto/credentials.dto';
import { User } from 'src/users';
export declare class AuthController {
    private authservice;
    constructor(authservice: AuthService);
    signUp(createUserDTO: CreateUserDTO): Promise<{
        message: string;
    }>;
    signIn(credentialsDTO: CredentialsDTO): Promise<{
        token: string;
    }>;
    getMe(user: User): User;
}
