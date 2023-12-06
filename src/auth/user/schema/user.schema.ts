import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enum/user.roles";

@Schema()
export class User extends Document{

    @Prop()
    name: string;

    @Prop({unique: [true, 'Duplicate email entered']})
    email: string

    @Prop({select: false})
    password: string

    @Prop({default: false, type: Boolean})
    deleted: boolean

    @Prop({enum: Role, default: Role.USER})
    role: Role

}

export const UserSchema = SchemaFactory.createForClass(User)