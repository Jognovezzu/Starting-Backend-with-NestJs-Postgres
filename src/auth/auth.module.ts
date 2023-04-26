import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport/dist';


@Module({
  imports: [TypeOrmModule.forFeature([User]),UsersModule, JwtModule.register({secret: 'super-secret', signOptions:{expiresIn:1800}}), PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService,UsersService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
