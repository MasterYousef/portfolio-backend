import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomException } from 'src/exceptions/custom.exception';
import { Project } from 'src/modules/project/project.schema';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(
    @InjectModel(Project.name) private readonly ProjectModel: Model<Project>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    if (!req.body.project) {
      throw new CustomException('unauthorized', 401);
    }
    const data = await this.ProjectModel.findById(req.body.project);
    if (!data) {
      throw new CustomException('project not found', 404);
    }
    return true;
  }
}
