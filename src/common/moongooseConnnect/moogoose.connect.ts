import { MongooseModule } from "@nestjs/mongoose";
import { Restaurant, RestaurantSchema } from "src/resturant/schema/resturant.schema";

export const mongooseFeature = MongooseModule.forFeature([
  { name: Restaurant.name, schema: RestaurantSchema},
]);