import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    userId: string;

    @Prop()
    uname: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    radioOption: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
