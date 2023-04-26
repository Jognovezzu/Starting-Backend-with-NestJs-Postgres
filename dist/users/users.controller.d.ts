import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDTO } from './dto/return-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createAdminUser(createUserDto: CreateUserDTO): Promise<ReturnUserDTO>;
}
