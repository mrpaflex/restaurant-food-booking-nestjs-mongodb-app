import { Module } from '@nestjs/common';
import { ResturantModule } from './resturant/resturant.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
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
    ResturantModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
