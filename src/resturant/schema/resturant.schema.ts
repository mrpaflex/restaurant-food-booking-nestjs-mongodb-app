import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Catagory } from "../enum/enums";

export type ResturantHydrated = HydratedDocument<Restaurant>

@Schema()
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

    images?: object[]

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    // userid: mongoose.Types.ObjectId;

    @Prop({type: Date, default: Date.now})
    date: Date

}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)