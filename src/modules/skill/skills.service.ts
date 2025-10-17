import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { skill } from "./skills.schema";
import CreateSkillDto from "./dto/create-skill.dto";
import UpdateSkillDto from "./dto/update-skill.dto";
import { CustomException } from "src/exceptions/custom.exception";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel("skill") private readonly skillsModel: Model<skill>,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async findAll(): Promise<skill[]> {
    return this.skillsModel.find().exec();
  }

  async create(skills: CreateSkillDto, buffer: Buffer): Promise<skill> {
    const image = await this.cloudinaryService.upload_image(buffer, "skills");
    (skills as any).image = image;
    const newSkill = new this.skillsModel(skills);
    return newSkill.save();
  }

  async findOne(id: string): Promise<skill> {
    const skill = await this.skillsModel.findById(id);
    if (!skill) {
      throw new CustomException("Skill not found", 404);
    }
    return skill;
  }

  async update(
    id: string,
    data: UpdateSkillDto,
    buffer?: Buffer
  ): Promise<skill> {
    const doc = await this.skillsModel.findById(id);
    if (!doc) {
      throw new CustomException("Skill not found", 404);
    }
    if (buffer) {
      const public_id = doc.image.split("/")[9].replace(".png", "");
      const image = await this.cloudinaryService.replaceImage(
        public_id,
        "skills",
        buffer
      );
      (data as any).image = image;
    }
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) (doc as any)[key] = (data as any)[key];
    });
    await doc.save();
    const skill = doc;
    if (!skill) {
      throw new CustomException("Skill not found", 404);
    }
    return skill;
  }

  async remove(id: string) {
    const skill = await this.skillsModel.findByIdAndDelete(id);
    if (!skill) {
      throw new CustomException("Skill not found", 404);
    }
    const url = (skill as any).image.split("/");
    const public_id = `${url[url.length - 3]}/${url[url.length - 2]}/${url[url.length - 1].replace(".png", "")}`;
    await this.cloudinaryService.delete_image(public_id);
    return { message: "skill deleted successfully" };
  }
}
