import { Module } from '@nestjs/common';
import { ResturantController } from './resturant.controller';
import { ResturantService } from './resturant.service';
import { RestaurantMongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';

@Module({
  imports: [RestaurantMongooseFeature],
  controllers: [ResturantController],
  providers: [ResturantService]
})
export class ResturantModule {}
