import { PartialType } from '@nestjs/mapped-types';
import CreateProjectDto from './create-project.dto';

export default class UpdateProjectDto extends PartialType(CreateProjectDto) {}
