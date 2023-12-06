import { Module } from '@nestjs/common';
import { ResturantController } from './resturant.controller';
import { ResturantService } from './resturant.service';
import { RestaurantMongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    RestaurantMongooseFeature
  ],
  controllers: [ResturantController],
  providers: [ResturantService],
  exports: [ResturantService],
})
export class ResturantModule {}
