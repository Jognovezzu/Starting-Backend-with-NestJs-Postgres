import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule} from '@nestjs/passport/dist';


@Module({
    imports: [TypeOrmModule.forFeature([User]), JwtModule.register({secret: 'super-secret', signOptions:{expiresIn:1800}}), PassportModule.register({defaultStrategy: 'jwt'})],
    providers: [UsersService],
    controllers: [UsersController],
    exports:[TypeOrmModule]
})
export class UsersModule {}
