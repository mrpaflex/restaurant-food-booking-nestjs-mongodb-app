import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  * as mongoose from "mongoose";
import { Catagory } from "../enum/enums";
import { User } from "src/auth/user/schema/user.schema";
import { Meal } from "src/meal/schema/meal.schema";

//export type ResturantHydrated = HydratedDocument<Restaurant>

@Schema()
export class Location{
    @Prop({type: String, enum: ['Point']})
    type: string;

    @Prop({index: '2dsphere'})
    coordinates: Number[];
    formattedAddress: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
};

@Schema({timestamps: true})
export class Restaurant{
    @Prop()
    nameofrestuarant: string;
    @Prop()
    ownername: string
    @Prop()
    description: string;
    @Prop()
    email: string;
    @Prop()
    phoneNumber: string;
    @Prop({enum: Catagory})
    category: Catagory
    @Prop()
    address: string;

    @Prop({default: null})
    images?: object[]

    @Prop({type: Object, ref: 'Location'})
    location?: Location

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    userid: User

    @Prop([{type: mongoose.Schema.Types.ObjectId, ref: 'Meal'}])
   // menu?: Meal[]
     menu?: [mongoose.Types.ObjectId];

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    // userid: mongoose.Types.ObjectId;

    // @Prop({type: Date, default: Date.now})
    // date: Date

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)