import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
   // @IsStrongPassword()
    @IsString()
   // @MinLength(7, {message: 'password must be minumum of 7 character'})
     password: string;
}