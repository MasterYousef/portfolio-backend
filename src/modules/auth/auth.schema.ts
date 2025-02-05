import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type user_document = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  username: string;

  @Prop({ required: true, unique: true, minlength: 5, maxlength: 255 })
  email: string;

  @Prop({ required: true, minlength: 6 })
  password: string;

  @Prop()
  image: string;

  @Prop({ required: true, enum: ['admin', 'user'] })
  role: string;

  @Prop()
  resetCode: number;

  @Prop({ default: false })
  resetStatus: boolean;

  @Prop()
  codeExpire: Date;

  @Prop()
  passwordChangeAt: Date;
}

export const user_schema = SchemaFactory.createForClass(User);
