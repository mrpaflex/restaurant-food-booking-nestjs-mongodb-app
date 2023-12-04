import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Restaurant } from './schema/resturant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateResturantDTO } from './dto/create-restuarant.dto';
import { UpdateRestaurantDTo } from './dto/update-restuarant.dto';
import { Query } from 'express-serve-static-core';
import APIFeatures, { deleteimages, uploadImages } from 'src/utils/locationApi.utils';

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

    const location = await APIFeatures.getRestaurantLocation(body.address)
    const createRestuarant = await this.restaurantModel.create({
        ...body,
        location
    })

    //await createRestuarant.save()
   
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
    const restaurant = await this.findrestuarantById(id);

    await this.deleteimages(restaurant.images)
    
    await this.restaurantModel.findByIdAndDelete(restaurant)
    return{
        info: `restaurant with id ${id} is succesffully deleted`
    }
   }

   //update restaurant images
   async uploadimages(id, files){
    await this.findrestuarantById(id);
    const images = await uploadImages(files)

    const restaurant = await this.restaurantModel.findByIdAndUpdate(id, {
        images: images as Object[],
    },{
        new: true,
        runValidators: true
    })

    return restaurant;
 
}

async deleteimages(images){
    const deletedimages = await deleteimages(images)
    return deletedimages
}

}