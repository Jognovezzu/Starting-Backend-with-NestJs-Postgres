import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserRole } from './user-roles.enum';
import {DataSource, Repository} from 'typeorm';
import { User } from './user.entity';

import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDTO } from './dto/credentials.dto';




@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private dataSource: DataSource,
    ){}
    

    async createAdminUser(createUserDTO: CreateUserDTO): Promise<User>{
        if (createUserDTO.password != createUserDTO.passwordConfirmation) {
            throw new UnprocessableEntityException('Senhas não conferem');

        }
        else{
            return this.createUser(createUserDTO,UserRole.ADMIN);
        }

    }


    async createUser (CreateUserDTO:CreateUserDTO, role: UserRole,) : Promise<User>{
        const {email, name, password} = CreateUserDTO;
        const user = this.userRepository.create();
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

    async checkcredential (credentialsDTO: CredentialsDTO): Promise<User>{
        const { email, password } = credentialsDTO;
        const user = await this.userRepository.findOne({where:{email:email, status: true} });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
        return null;
    }
    }

    async hashPassword(password:string, salt:string): Promise<string>{
        return bcrypt.hash(password,salt);}

    
}
