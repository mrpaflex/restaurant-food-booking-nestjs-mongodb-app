import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  * as mongoose from "mongoose";
import { User } from "src/auth/user/schema/user.schema";
import { Category } from "../enum/meal.enum";

@Schema({timestamps: true})
export class Meal {
    @Prop()
    name: string;
    @Prop()
    description: string;
    @Prop()
    price: number;
    @Prop({enum: Category, default: Category.SOUPS})
    category: Category

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userid: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'})
    restaurant: string;

    @Prop({default: null})
    images?: object[]
}

export const MealSchema = SchemaFactory.createForClass(Meal)