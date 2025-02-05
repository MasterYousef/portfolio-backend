import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../auth/Auth.schema';

export type project_document = HydratedDocument<Project>;

@Schema()
export class Project {
  @Prop({ required: true, minlength: 6, maxlength: 100 })
  title: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: User.name })
  likes: [User];
}

export const project_schema = SchemaFactory.createForClass(Project);

project_schema.pre('init', function () {
  this.populate('likes', 'username _id');
});
