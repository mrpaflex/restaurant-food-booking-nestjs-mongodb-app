import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Restaurant } from './schema/resturant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResturantDTO } from './dto/create-restuarant.dto';
import { UpdateRestaurantDTo } from './dto/update-restuarant.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class ResturantService {
    constructor(@InjectModel(Restaurant.name)
    private restaurantModel: Model<Restaurant>
    ){}

    //this is to search for restaurant 
   async findall(query: Query): Promise<Restaurant[]>{
    const resPerPage = 3;
    const currntPage = Number(query.page) || 1;
    const skip = resPerPage * (currntPage-1);

    const keyword = query.keyword ? {
        nameofrestuarant:{
            $regex: query.keyword,
            $options: 'i'
        }
    }:{}
    return await this.restaurantModel.find({...keyword})
    .limit(resPerPage)
    .skip(skip)

   }

   async create(body: CreateResturantDTO): Promise<Restaurant>{
    const restaurants = await this.restaurantModel.findOne({
        email: body.email
    })

    if (restaurants) {
        throw new HttpException(
            `A restaurant with the email '${body.email}' already exists.
            check if it's your restaurant
            Restaurant Name: ${restaurants.nameofrestuarant}, 
            Owner: ${restaurants.ownername}`,
            HttpStatus.UNPROCESSABLE_ENTITY
        );
    }

    const createRestuarant = await this.restaurantModel.create({
        ...body
    })

    await createRestuarant.save()
   
    return createRestuarant
   }

   async findrestuarantById(id: string): Promise<Restaurant>{
    const restuarants = await this.restaurantModel.findById(id);
    if (!restuarants) {
        throw new HttpException(`restaurant with id ${id} does not exit `, HttpStatus.NOT_FOUND)
    }
    return restuarants
   }

   async updaterestaurant(id: string, body: UpdateRestaurantDTo): Promise<Restaurant>{
    await this.findrestuarantById(id)
    const updateresturant = await this.restaurantModel.findByIdAndUpdate(id, body,{
        new: true,
        runValidators: true
    })
    return updateresturant
   }

   async deleteRestaurant(id: string): Promise<any>{
    await this.findrestuarantById(id)
   const restaurant = await this.restaurantModel.findByIdAndDelete(id)
    return{
        info: `restaurant with id ${id} is succesffully deleted`
    }
   }
 
}
