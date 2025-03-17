import { Controller, Get, Post, Param, Delete, Put, Req } from "@nestjs/common";
import { ProjectService } from "./project.service";
import CreateProjectDto from "./dto/create-project.dto";
import UpdateProjectDto from "./dto/update-project.dto";
import { Public } from "src/decorator/public.decorator";
import { Roles } from "src/decorator/role.decorator";
import user from "src/decorator/user.decorator";
import { File } from "src/decorator/file.decorator";
import { plainToInstance } from "class-transformer";
import { CustomException } from "src/exceptions/custom.exception";
import errors from "src/validations/file.validation";
import IdParamDto from "src/validations/id-param.dto";

@Controller("project")
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Roles("admin")
  @Post()
  async create(@Req() req: Request, @File() file: Buffer) {
    if (!file) throw new CustomException("File not found", 404);
    const data = plainToInstance(CreateProjectDto, req.body);
    await errors(data);
    return this.projectService.create(data, file);
  }
  @Public()
  @Get()
  findAll() {
    return this.projectService.findAll();
  }
  @Public()
  @Get(":id")
  findOne(@Param() Param: IdParamDto) {
    return this.projectService.findOne(Param.id);
  }
  @Roles("admin")
  @Put(":id")
  async update(
    @Param() Param: IdParamDto,
    @Req() req: Request,
    @File() file: Buffer
  ) {
    const data = plainToInstance(UpdateProjectDto, req.body, {
      excludeExtraneousValues: true,
    });
    await errors(data);
    return this.projectService.update(Param.id, data, file);
  }
  @Roles("admin")
  @Delete(":id")
  remove(@Param() Param: IdParamDto) {
    return this.projectService.remove(Param.id);
  }
  @Roles("user")
  @Post(":id/like")
  add_like(@Param("id") id: string, @user("_id") user: string) {
    return this.projectService.add_like(id, user);
  }

  @Roles("user")
  @Delete(":id/like")
  remove_like(@Param("id") id: string, @user("_id") user: string) {
    return this.projectService.remove_like(id, user);
  }
}
