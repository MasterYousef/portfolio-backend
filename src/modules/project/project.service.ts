import { Injectable } from '@nestjs/common';
import CreateProjectDto from './dto/create-project.dto';
import UpdateProjectDto from './dto/update-project.dto';
import { Model } from 'mongoose';
import { Project } from './project.schema';
import { CustomException } from 'src/exceptions/custom.exception';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from '../comment/comment.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>,
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly CloudinaryService: CloudinaryService,
  ) {}
  async create(createProject: CreateProjectDto, buffer: Buffer) {
    const image = await this.CloudinaryService.upload_image(buffer, 'project');
    createProject.image = image;
    const data = await this.projectModel.create(createProject);
    return data;
  }

  async findAll() {
    return await this.projectModel.find().exec();
  }

  async findOne(id: string) {
    const data = await this.projectModel.findById(id);
    if (!data) {
      throw new CustomException('Project not found', 404);
    }
    return data;
  }

  async update(id: string, updateProject: UpdateProjectDto, buffer: Buffer) {
    if (!updateProject) {
      throw new CustomException('please choose data to update', 404);
    }
    const data = await this.projectModel.findById(id);
    if (buffer) {
      const public_id = data.image.split('/')[9].replace('.png', '');
      const image = await this.CloudinaryService.replaceImage(
        public_id,
        'project',
        buffer,
      );
      updateProject.image = image;
    }
    Object.keys(updateProject).forEach(
      (key) => (data[key] = updateProject[key]),
    );
    await data.save();
    if (!data) {
      throw new CustomException('Project not found', 404);
    }
    return data;
  }

  async remove(id: string) {
    await this.commentModel.deleteMany({ project: id });
    const data = await this.projectModel.findByIdAndDelete(id);
    if (!data) {
      throw new CustomException('Project not found', 404);
    }
    const url = data.image.split('/');
    const public_id = `${url[url.length - 3]}/${url[url.length - 2]}/${url[url.length - 1].replace('.png', '')}`;
    await this.CloudinaryService.delete_image(public_id);
    return { message: 'Project deleted successfully' };
  }

  async add_like(id: string, user: string) {
    const project = await this.projectModel.findByIdAndUpdate(
      id,
      {
        $addToSet: { likes: user },
      },
      { new: true },
    );
    if (!project) {
      throw new CustomException('Project not found', 404);
    }
    return project;
  }
  async remove_like(id: string, user: string) {
    const project = await this.projectModel.findByIdAndUpdate(id, {
      $pull: { likes: user },
    });
    if (!project) {
      throw new CustomException('Project not found', 404);
    }
    return { message: 'Like removed successfully' };
  }
}
