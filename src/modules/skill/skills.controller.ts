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
  findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }
  @Roles('admin')
  @Put(':id')
  update(@Body() data: UpdateSkillDto, @Param('id') id: string) {
    return this.skillsService.update(id, data);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}
