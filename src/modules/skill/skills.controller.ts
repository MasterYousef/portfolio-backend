import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
} from "@nestjs/common";
import { SkillsService } from "./skills.service";
import CreateSkillDto from "./dto/create-skill.dto";
import UpdateSkillDto from "./dto/update-skill.dto";
import { Roles } from "src/decorator/role.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { Public } from "src/decorator/public.decorator";
import IdParamDto from "src/validations/id-param.dto";
import { File } from "src/decorator/file.decorator";
import { plainToInstance } from "class-transformer";
import { CustomException } from "src/exceptions/custom.exception";
import errors from "src/validations/file.validation";
@Controller("skills")
@UseGuards(AuthGuard)
export class SkillController {
  constructor(private readonly skillsService: SkillsService) {}
  @Roles("admin")
  @Post()
  async create(@Req() req: Request, @File() file: Buffer) {
    if (!file) throw new CustomException("File not found", 404);
    const data = plainToInstance(CreateSkillDto, req.body);
    await errors(data);
    return this.skillsService.create(data, file);
  }
  @Public()
  @Get()
  findAll() {
    return this.skillsService.findAll();
  }
  @Public()
  @Get(":id")
  findOne(@Param() Param: IdParamDto) {
    return this.skillsService.findOne(Param.id);
  }
  @Roles("admin")
  @Put(":id")
  async update(
    @Body() body: any,
    @Param() Param: IdParamDto,
    @Req() req: Request,
    @File() file: Buffer
  ) {
    const data = plainToInstance(UpdateSkillDto, req.body, {
      excludeExtraneousValues: true,
    });
    await errors(data);
    return this.skillsService.update(Param.id, data, file);
  }
  @Roles("admin")
  @Delete(":id")
  remove(@Param() Param: IdParamDto) {
    return this.skillsService.remove(Param.id);
  }
}
