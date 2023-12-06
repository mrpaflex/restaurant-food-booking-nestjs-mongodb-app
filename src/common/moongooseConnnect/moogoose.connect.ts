import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/auth/user/schema/user.schema";
import { Meal, MealSchema } from "src/meal/schema/meal.schema";
import { Restaurant, RestaurantSchema } from "src/resturant/schema/resturant.schema";

export const RestaurantMongooseFeature = MongooseModule.forFeature([
  { name: Restaurant.name, schema: RestaurantSchema},
]);

export const userMongooseFeature = MongooseModule.forFeature([
  { name: User.name, schema: UserSchema},
]);

export const mealMongooseFeature = MongooseModule.forFeature([
  { name: Meal.name, schema: MealSchema},
]);

export const Jwtmodule = JwtModule.registerAsync({
  global: true,
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