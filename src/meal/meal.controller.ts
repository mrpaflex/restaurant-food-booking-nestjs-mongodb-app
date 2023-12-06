import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal-dto';
import { Meal } from './schema/meal.schema';
import { CurrentUser } from 'src/auth/decorators/current.user.decorator';
import { JwtAuthGuards } from 'src/auth/guards/jwt.guards';
import { User } from 'src/auth/user/schema/user.schema';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateMealDto } from './dto/update-meal-dto';

@Controller('meal')
export class MealController {
    constructor(private mealService: MealService){}

    @Post('create')
    @UseGuards(JwtAuthGuards)
   // @UseInterceptors(FilesInterceptor('files', 3))
    createmeal(@Body() createmealdto: CreateMealDto, @CurrentUser() user: User, //@UploadedFiles() files: Array<Express.Multer.File>
    ): Promise<Meal>{
        //console.log(files)
        return this.mealService.createmeal(createmealdto, user)
    }

    @Get('findall')
    getallmeal():Promise<Meal[]>{
        return this.mealService.findallmeal()
    }

    @Get('findone/:id')
    getmealbyid(@Param('id') id: string):Promise<Meal>{
        return this.mealService.findmealbyId(id)
    }

    @Put('update/:id')
    @UseGuards(JwtAuthGuards)
    async updatemeal(@Param('id') id: string, @CurrentUser() user: User, @Body() updatedto: UpdateMealDto){
        return await this.mealService.updatemeal(id, user, updatedto)
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuards)
    async deletemeal(@Param('id') id: string,  @CurrentUser() user: User ): Promise<string>{
        return await this.mealService.deletemeal(id, user)
    }
}
