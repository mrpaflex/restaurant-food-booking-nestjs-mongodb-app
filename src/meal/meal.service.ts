import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schema/meal.schema';
import { Model } from 'mongoose';
import { CreateMealDto } from './dto/create-meal-dto';
import { User } from 'src/auth/user/schema/user.schema';
import { ResturantService } from 'src/resturant/resturant.service';
import { uploadImages } from 'src/utils/locationApi.utils';
import { UpdateMealDto } from './dto/update-meal-dto';
import { Restaurant } from 'src/resturant/schema/resturant.schema';

@Injectable()
export class MealService {
    constructor(@InjectModel(Meal.name)
    private mealModel: Model<Meal>,
    private restaurantService: ResturantService,
    @InjectModel(Restaurant.name)
    private resModel: Model<Restaurant>
    ){}

    async createmeal(createmealDto: CreateMealDto, user: User): Promise<Meal>{

        const restaurant = await this.resModel.findById(createmealDto.restaurant);
        if (!restaurant) {
            throw new HttpException('restaurant id does not exist', HttpStatus.NOT_FOUND)
        }


        if (restaurant.userid.toString() !== user._id.toString()) {
            console.log(restaurant.userid, user._id)
            throw new HttpException('this is not your restaurant, so you can not add meal', HttpStatus.UNAUTHORIZED)
        }

        const createmeal = await this.mealModel.create({
            ...createmealDto,
            userid: user._id
        });

        restaurant.menu.push(createmeal._id)

        await restaurant.save()

        return createmeal

    }

    async findallmeal():Promise<Meal[]>{
        return await this.mealModel.find()
    }

    async findmealbyId(id: string): Promise<Meal>{
        const meal = await this.mealModel.findById(id)
        if (!meal) {
            throw new HttpException('meal id not found', HttpStatus.NOT_FOUND)
        }
        return meal;
    }

    async updatemeal(id: string, user: User, updatedto: UpdateMealDto){
        const meal = await this.findmealbyId(id);
        if (user._id.toString() !== meal.userid.toString()) {
            console.log(user._id, meal.userid)
            throw new HttpException('you can only update your restaurant meals', HttpStatus.UNAUTHORIZED)
        }

        const updatedmeal = await this.mealModel.findByIdAndUpdate(id, updatedto, {
            new: true,
            runValidators: true
        })

        return updatedmeal
    }


    async deletemeal(id: string, user: User): Promise<string> {
        const meal = await this.mealModel.findById(id);
    
        if (user._id.toString() !== meal.userid.toString()) {
            console.log(user._id, meal.userid);
            throw new HttpException('You can only delete a meal from your restaurant', HttpStatus.UNAUTHORIZED);
        }
    
        console.log(meal._id, meal.userid, meal.restaurant);
    
        const mealId = await this.resModel.findById(meal.restaurant);
        console.log(mealId.menu);
    
        // Find the index of the meal in the menu array
        const mealIndex = mealId.menu.findIndex((menuMeal) => menuMeal._id.toString() === id);
    
        // Check if the meal was found in the menu
        if (mealIndex !== -1) {
            // Remove the meal from the menu array
            mealId.menu.splice(mealIndex, 1);
            console.log(mealId.menu);
        } else {
            throw new HttpException('Meal not found in the restaurant menu', HttpStatus.NOT_FOUND);
        }
    
        await this.mealModel.findByIdAndDelete(id);
    
        // Save the updated restaurant with the removed meal from the menu
        await mealId.save();
    
        return 'Deleted successfully';
    }
    
}


