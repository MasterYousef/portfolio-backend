import { PartialType } from '@nestjs/mapped-types';
import CreateSkillDto from './create-skill.dto';

export default class UpdateSkillDto extends PartialType(CreateSkillDto) {}
