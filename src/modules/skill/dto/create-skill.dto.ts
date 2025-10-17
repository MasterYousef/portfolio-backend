import { IsNotEmpty, IsString } from "class-validator";

export default class CreateSkillDto {
  @IsNotEmpty({ message: "Please provide a name" })
  @IsString({ message: "Please provide a valid name" })
  name: string;
  image?: string;
}
