import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateSkillDto {
  @IsNotEmpty({ message: 'Please provide a name' })
  @IsString({ message: 'Please provide a valid name' })
  name: string;
  @IsNotEmpty({ message: 'Please provide count number' })
  @IsNumber({}, { message: 'Please provide a valid count number' })
  count: number;
}
