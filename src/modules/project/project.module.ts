import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project, project_schema } from './project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from '../comment/comment.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: project_schema }]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService, CloudinaryService],
})
export class ProjectModule {}
