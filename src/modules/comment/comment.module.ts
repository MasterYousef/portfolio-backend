import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Comment, CommentSchema } from './comment.schema';
import { CommentGuard } from 'src/guards/comment.guard';
import { Project, project_schema } from '../project/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Project.name, schema: project_schema }]),
  ],
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: 'APP_guard',
      useClass: CommentGuard,
    },
  ],
})
export class CommentModule {}
