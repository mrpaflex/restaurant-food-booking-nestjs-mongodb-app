import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Category } from "../enum/meal.enum";

export class CreateMealDto{
    @IsNotEmpty()
    @IsString()
    name: string;
 
    @IsNotEmpty()
    @IsString()
    description: string;
   
    @IsNotEmpty()
    @IsNumber()
    price: number;
    
    @IsNotEmpty()
    @IsString()
    category: Category

    @IsNotEmpty()
    @IsString()
    restaurant: string;

    images?: object[]
}