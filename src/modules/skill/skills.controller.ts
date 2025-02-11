import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import CreateSkillDto from './dto/create-skill.dto';
import UpdateSkillDto from './dto/update-skill.dto';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorator/public.decorator';
import IdParamDto from 'src/validations/id-param.dto';
@Controller('skills')
@UseGuards(AuthGuard)
export class SkillController {
  constructor(private readonly skillsService: SkillsService) {}
  @Roles('admin')
  @Post()
  create(@Body() skills: CreateSkillDto) {
    return this.skillsService.create(skills);
  }
  @Public()
  @Get()
  findAll() {
    return this.skillsService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param() Param: IdParamDto) {
    return this.skillsService.findOne(Param.id);
  }
  @Roles('admin')
  @Put(':id')
  update(@Body() data: UpdateSkillDto, @Param() Param: IdParamDto) {
    return this.skillsService.update(Param.id, data);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param() Param: IdParamDto) {
    return this.skillsService.remove(Param.id);
  }
}
