import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillSchema } from './skills.schema';
import { SkillController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'skill', schema: SkillSchema }]),
  ],
  controllers: [SkillController],
  providers: [SkillsService],
})
export class SkillModule {}
