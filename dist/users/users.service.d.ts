import { CreateUserDTO } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { CredentialsDTO } from './dto/credentials.dto';
export declare class UsersService {
    private userRepository;
    private dataSource;
    constructor(userRepository: Repository<User>, dataSource: DataSource);
    createAdminUser(createUserDTO: CreateUserDTO): Promise<User>;
    createUser(CreateUserDTO: CreateUserDTO, role: UserRole): Promise<User>;
    checkcredential(credentialsDTO: CredentialsDTO): Promise<User>;
    hashPassword(password: string, salt: string): Promise<string>;
}
