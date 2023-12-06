import {PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { ConfigService } from "@nestjs/config";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService: AuthService,
        private config: ConfigService
    ){ 
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWTSECRET') })
        }
      

        async validate(payload){
            const {id} =payload;
            const user = await this.userService.finduserbyId(id)
            if (!user) {
                throw new HttpException('you need to log in first to gain access', HttpStatus.UNAUTHORIZED)
            }

            return user

        }

}