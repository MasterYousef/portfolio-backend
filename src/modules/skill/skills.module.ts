import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SkillSchema } from "./skills.schema";
import { SkillController } from "./skills.controller";
import { SkillsService } from "./skills.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "skill", schema: SkillSchema }]),
  ],
  controllers: [SkillController],
  providers: [SkillsService, CloudinaryService],
})
export class SkillModule {}
