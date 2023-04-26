import { PassportStrategy } from "@nestjs/passport";
import {Strategy, ExtractJwt} from 'passport-jwt';
import { Injectable , UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users";
import { UserRepository } from "src/users/users.repository";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'super-secret',
        });
    }

    async validate(payload: {id/*number*/}){
        const {id} = payload;
        const user = await this.userRepository.findOne({where:{id:id},select: ['name', 'email', 'status','role'],});
        
        if (!user){
            throw new UnauthorizedException('User Not Found!!')
        }

        return user
    }
}