import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ResturantService } from './resturant.service';
import { Restaurant } from './schema/resturant.schema';
import { CreateResturantDTO } from './dto/create-restuarant.dto';
import { UpdateRestaurantDTo } from './dto/update-restuarant.dto';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('resturant')
export class ResturantController {
    constructor(
        private resturantService: ResturantService  
    ){}
   

    @Get('findall')
    async findall(@Query() query: ExpressQuery): Promise<Restaurant[]>{
        return await this.resturantService.findall(query)       
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

    @Put('upload/:id')
    @UseInterceptors(FilesInterceptor('files', 3))
    async uploadimages( @Param('id') id: string, @UploadedFiles() files: Array<Express.Multer.File>){
        const uploadedimages = await this.resturantService.uploadimages(id, files)
        return uploadedimages
    }
}
