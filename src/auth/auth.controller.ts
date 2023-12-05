import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './user/dto/create.user.dto';
import { User } from './user/schema/user.schema';
import { LoginUserDto } from './user/dto/login.user.dto';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post('signup')
    createuser(@Body() createuserdto: CreateUserDto): Promise<User>{
        return this.authService.createuser(createuserdto)
    }

    @Post('login')
    loginuser(@Body() logindto: LoginUserDto): Promise<{token: string}>{
        return this.authService.loginuser(logindto)
    }

}
