import { Module } from '@nestjs/common';
import { ResturantModule } from './resturant/resturant.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    ConfigModule.forRoot({
    // envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService)=>({
        uri: configService.get<string>('MONG_URI')
      }),
      inject: [ConfigService]
    }),
    ResturantModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
