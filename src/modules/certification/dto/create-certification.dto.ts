import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export default class CreateCertificationDto {
  @Expose()
  @IsNotEmpty({ message: 'Please provide a title' })
  @IsString({ message: 'Please provide a valid title' })
  @MaxLength(255, { message: 'title max characters is 255' })
  title: string;

  @Expose()
  @IsNotEmpty({ message: 'Please provide company name' })
  @IsString({ message: 'Please provide a valid company' })
  @MaxLength(255, { message: 'company max characters is 255' })
  company: string;

  @Expose()
  @IsNotEmpty({ message: 'Please provide skills' })
  skills: string[];

  @Expose()
  image: string;
}
