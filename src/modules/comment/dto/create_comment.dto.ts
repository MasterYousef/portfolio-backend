import { IsMongoId, IsNotEmpty, MaxLength } from 'class-validator';

export class CommentDto {
  @IsNotEmpty({ message: 'Comment is required' })
  @MaxLength(500, { message: 'Comment is too long' })
  comment: string;
  @IsNotEmpty({ message: 'user id is required' })
  @IsMongoId({ message: 'Invalid user id' })
  user: string;
  @IsNotEmpty({ message: 'project id is required' })
  @IsMongoId({ message: 'Invalid project id' })
  project: string;
}
