import { Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export default class UpdateUser {
  @Expose()
  @IsOptional()
  @IsNotEmpty({ message: "Please enter your new image" })
  image: string;
  @IsOptional()
  @IsNotEmpty({ message: "Please enter your username" })
  @IsString({ message: "Username must be a string" })
  @MinLength(3, { message: "Username must be at least 3 characters long" })
  @MaxLength(50, { message: "Username must be at most 50 characters long" })
  @Expose()
  username: string;
  @IsOptional()
  @IsNotEmpty({ message: "Please enter your email" })
  @IsString({ message: "Email must be a string" })
  @MaxLength(255, { message: "Email must be at most 255 characters long" })
  @MinLength(5, { message: "Email must be at least 5 characters long" })
  @Expose()
  email: string;
}
