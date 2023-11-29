import { Module } from '@nestjs/common';
import { ResturantController } from './resturant.controller';
import { ResturantService } from './resturant.service';
import { mongooseFeature } from 'src/common/moongooseConnnect/moogoose.connect';

@Module({
  imports: [mongooseFeature],
  controllers: [ResturantController],
  providers: [ResturantService]
})
export class ResturantModule {}
