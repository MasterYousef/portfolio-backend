import { PartialType } from '@nestjs/mapped-types';
import CreateCertificationDto from './create-certification.dto';

export default class UpdateCertificationDto extends PartialType(
  CreateCertificationDto,
) {}
