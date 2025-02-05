import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export default class CreateProjectDto {
  @IsNotEmpty({ message: 'Project Name is required' })
  @MinLength(6, { message: 'project title must be least 6 characters long' })
  @MaxLength(100, { message: 'project title must be most 100 characters long' })
  title: string;
  @IsNotEmpty({ message: 'Project code link is required' })
  code: string;
  @IsNotEmpty({ message: 'Project link is required' })
  link: string;
  likes: number;
  image: string;
}
