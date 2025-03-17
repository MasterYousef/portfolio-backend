import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { User } from "../auth/auth.schema";
import { Project } from "../project/project.schema";

export type comment_document = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ required: true, maxlength: 500 })
  comment: string;
  @Prop({
    required: true,
    ref: User.name,
  })
  user: mongoose.Schema.Types.ObjectId;
  @Prop({
    required: true,
    ref: Project.name,
  })
  project: mongoose.Schema.Types.ObjectId;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.pre("find", function () {
  this.populate("user", "username _id image");
});
