import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Catagory } from "../enum/enums";

export class CreateResturantDTO{

    @IsString()
    @IsNotEmpty()
    nameofrestuarant: string;

    @IsString()
    @IsNotEmpty()
    ownername: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;
 
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber('NG')
    @IsNotEmpty()
    phoneNumber: string;
    
    @IsEnum(Catagory)
    @IsNotEmpty()
    category: Catagory

    @IsString()
    @IsNotEmpty()
    address: string;

    images?: object[]
}