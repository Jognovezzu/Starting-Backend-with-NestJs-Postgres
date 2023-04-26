import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
export declare class UserRepository extends Repository<User> {
    createUser(CreateUserDTO: CreateUserDTO, role: UserRole): Promise<User>;
    private hashPassword;
}
