import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.schema';
import { Model } from 'mongoose';
import { CommentDto } from './dto/create_comment.dto';
import { CustomException } from 'src/exceptions/custom.exception';
import { UpdateCommentDto } from './dto/update_comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}
  async create(comment: CommentDto) {
    return await this.commentModel.create(comment);
  }

  async findAll() {
    return await this.commentModel.find().exec();
  }

  async findOne(id: string) {
    const data = await this.commentModel.findById(id);
    if (!data) {
      throw new CustomException('Comment not found', 404);
    }
    return data;
  }

  async update(id: string, comment: UpdateCommentDto) {
    const data = await this.commentModel.findByIdAndUpdate(id, comment, {
      new: true,
    });
    if (!data) {
      throw new CustomException('Comment not found', 404);
    }
    return data;
  }

  async remove(id: string) {
    const data = await this.commentModel.findByIdAndDelete(id);
    if (!data) {
      throw new CustomException('Comment not found', 404);
    }
    return { message: 'Comment deleted successfully' };
  }

  async project_comments(project: string) {
    const data = await this.commentModel.find({ project: project }).exec();
    if (!data) {
      throw new CustomException('Comments not found', 404);
    }
    return data;
  }

  async user_comments(user: string) {
    const data = await this.commentModel.find({ user: user }).exec();
    if (!data) {
      throw new CustomException('Comments not found', 404);
    }
    return data;
  }
}
