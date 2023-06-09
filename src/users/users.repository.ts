import { DataSource, EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

//FILE TO MAKE TEST
@EntityRepository(User)

export class UserRepository extends Repository<User> {
    async createUser (CreateUserDTO:CreateUserDTO, role: UserRole,) : Promise<User>{
        const {email, name, password} = CreateUserDTO;
        

        
        const user = this.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.status = true;

        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();

        user.password = await this.hashPassword(password,user.salt);
        
        try{
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        } catch (error) {
        if (error.code.toString() === '23505') {
            throw new ConflictException('Endereço de email já está em uso');
        } 
        else {
            throw new InternalServerErrorException(
            'Erro ao salvar o usuário no banco de dados',
        );}
        
        }
    }
       
private async hashPassword(password:string, salt:string): Promise<string>{
    return bcrypt.hash(password,salt);}
    
}


