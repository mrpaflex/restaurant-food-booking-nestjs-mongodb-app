import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/user/schema/user.schema";
import { Restaurant, RestaurantSchema } from "src/resturant/schema/resturant.schema";

export const RestaurantMongooseFeature = MongooseModule.forFeature([
  { name: Restaurant.name, schema: RestaurantSchema},
]);

export const userMongooseFeature = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema},
]);

export const Jwtmodule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService)=>{
    return{
      secret: config.get<string>('JWTSECRET'),
      signOptions: {
        expiresIn: config.get<string | number>('JWT_EXPIRE_TIME')
      }
    }
  }
})