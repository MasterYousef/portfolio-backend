import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Certification>;

@Schema()
export class Certification {
  @Prop({ required: true, maxlength: 255 })
  title: string;

  @Prop({ required: true, maxlength: 255 })
  company: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  skills: string[];
}

export const CertificationSchema = SchemaFactory.createForClass(Certification);
