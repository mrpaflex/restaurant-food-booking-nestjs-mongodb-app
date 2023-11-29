import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ResturantService } from './resturant.service';
import { Restaurant } from './schema/resturant.schema';
import { CreateResturantDTO } from './dto/create-restuarant.dto';
import { UpdateRestaurantDTo } from './dto/update-restuarant.dto';

@Controller('resturant')
export class ResturantController {
    constructor(
        private resturantService: ResturantService  
    ){}
   

    @Get('findall')
    async findall(): Promise<Restaurant[]>{
        return await this.resturantService.findall()
        
    }

    @Post('create')
    async createRestaurant(@Body()body: CreateResturantDTO): Promise<Restaurant>{
        return await this.resturantService.create(body)
    }

    @Get('findbyid/:id')
    async findbyId(@Param('id') id: string): Promise<Restaurant>{
        return await this.resturantService.findrestuarantById(id)
    }

    @Put('update/:id')
    async updateRestaurant(@Param('id') id: string, @Body() body: UpdateRestaurantDTo): Promise<Restaurant>{
        return await this.resturantService.updaterestaurant(id, body)
    }

    @Delete('delete/:id')
    async deleteRestaurant(@Param('id') id: string):Promise<any>{
        return await this.resturantService.deleteRestaurant(id)
    }
}
