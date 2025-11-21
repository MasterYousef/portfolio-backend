import { Expose } from "class-transformer";
import { IsNotEmpty, MaxLength, MinLength, IsArray } from "class-validator";

export default class CreateProjectDto {
  @Expose()
  @IsNotEmpty({ message: "Project Name is required" })
  @MinLength(6, { message: "project title must be least 6 characters long" })
  @MaxLength(100, { message: "project title must be most 100 characters long" })
  title: string;
  @Expose()
  @IsNotEmpty({ message: "Project code link is required" })
  code: string;
  @Expose()
  @IsNotEmpty({ message: "Project features is required" })
  @IsArray({ message: "Features must be an array" })
  features: string[];
  @Expose()
  @IsNotEmpty({ message: "Project link is required" })
  link: string;
  likes: number;
  image: string;
}
