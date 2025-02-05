import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { skill } from './skills.schema';
import CreateSkillDto from './dto/create-skill.dto';
import UpdateSkillDto from './dto/update-skill.dto';
import { CustomException } from 'src/exceptions/custom.exception';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel('skill') private readonly skillsModel: Model<skill>,
  ) {}
  async findAll(): Promise<skill[]> {
    return this.skillsModel.find().exec();
  }

  async create(skills: CreateSkillDto): Promise<skill> {
    const newSkill = new this.skillsModel(skills);
    return newSkill.save();
  }

  async findOne(id: string): Promise<skill> {
    const skill = await this.skillsModel.findById(id);
    if (!skill) {
      throw new CustomException('Skill not found', 404);
    }
    return skill;
  }

  async update(id: string, data: UpdateSkillDto): Promise<skill> {
    const skill = await this.skillsModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });
    if (!skill) {
      throw new CustomException('Skill not found', 404);
    }
    return skill;
  }

  async remove(id: string) {
    const skill = await this.skillsModel.findByIdAndDelete(id);
    if (!skill) {
      throw new CustomException('Skill not found', 404);
    }
    return { message: 'Project deleted successfully' };
  }
}
