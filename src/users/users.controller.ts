
import { Controller, Post, Get, Body, ValidationPipe, UseGuards} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDTO } from './dto/return-user.dto';
import { AuthGuard } from '@nestjs/passport/dist'; 
import { Role } from 'src/auth/role.decorator';
import { UserRole } from './user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard())
  async createAdminUser(@Body(ValidationPipe) createUserDto: CreateUserDTO,): Promise<ReturnUserDTO> {
    const user = await this.usersService.createAdminUser(createUserDto);
    return {user, message: 'Perfil-Administrador cadastrado com sucesso!',
    };
  }


}
