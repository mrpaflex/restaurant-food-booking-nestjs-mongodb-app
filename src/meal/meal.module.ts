import { Module } from '@nestjs/common';
import { MealController } from './meal.controller';
import { MealService } from './meal.service';
import { AuthModule } from 'src/auth/auth.module';
import { RestaurantMongooseFeature, mealMongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';
import { ResturantService } from 'src/resturant/resturant.service';
import { ResturantModule } from 'src/resturant/resturant.module';

@Module({
  imports: [
    AuthModule,
    ResturantModule,
    mealMongooseFeature,
    RestaurantMongooseFeature,
  ],
  controllers: [MealController],
  providers: [MealService]
})
export class MealModule {}
