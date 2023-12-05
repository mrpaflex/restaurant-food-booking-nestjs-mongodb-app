import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './user/dto/create.user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user/schema/user.schema';
import { comparedHashPassword, hashPassword } from './user/hashedpassword/password.hash';
import { LoginUserDto } from './user/dto/login.user.dto';
import { jwtassigntoken } from 'src/utils/locationApi.utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService
    ){}
    async createuser(createuserdto: CreateUserDto): Promise<User> {
       try {
        const user = await this.userModel.findOne({email: createuserdto.email});

        createuserdto.password = await hashPassword(createuserdto.password);

       const createNewUser = await this.userModel.create({
            ...createuserdto
        })

        return createNewUser;

       } catch (error) {
       if (error.code === 11000) {
          throw new HttpException('email already exist', HttpStatus.UNPROCESSABLE_ENTITY) 
        }

       }
    }

    async loginuser(logindto: LoginUserDto): Promise<{token: string}>{
         const user = await this.userModel.findOne({  email: logindto.email}).select('+password');
        //const user = await this.userModel.findOne({  email: logindto.email})//without seleting the password you will get an error
        if (!user) {
            throw new HttpException('invalid email and password', HttpStatus.UNAUTHORIZED)
        }

        if (user.deleted === true) {
            throw new HttpException('account not found or deleted', HttpStatus.NOT_FOUND)
        }

        if (await comparedHashPassword(logindto.password, user.password) === false) {
            throw new HttpException('invalid password and email', HttpStatus.UNPROCESSABLE_ENTITY)
        }

    const token = await jwtassigntoken(user._id, this.jwtService)
        return {token}
    }
}
