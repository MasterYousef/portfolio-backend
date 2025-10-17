import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CatDocument = HydratedDocument<skill>;

@Schema()
export class skill {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  image: string;
}

export const SkillSchema = SchemaFactory.createForClass(skill);
