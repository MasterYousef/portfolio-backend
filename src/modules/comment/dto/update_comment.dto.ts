import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CommentDto } from './create_comment.dto';

export class UpdateCommentDto extends PartialType(
  OmitType(CommentDto, ['user', 'project'] as const),
) {}
