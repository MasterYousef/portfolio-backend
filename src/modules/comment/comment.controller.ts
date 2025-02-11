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
import { CommentService } from './comment.service';
import { CommentDto } from './dto/create_comment.dto';
import { Roles } from 'src/decorator/role.decorator';
import { set_id } from 'src/decorator/set_id.decorator';
import { CommentGuard } from 'src/guards/comment.guard';
import { Public } from 'src/decorator/public.decorator';
import { UpdateCommentDto } from './dto/update_comment.dto';
import IdParamDto from 'src/validations/id-param.dto';
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Roles('user')
  @set_id()
  @UseGuards(CommentGuard)
  @Post()
  create(@Body() data: CommentDto) {
    return this.commentService.create(data);
  }
  @Public()
  @Get(':id')
  findOne(@Param() Param: IdParamDto) {
    return this.commentService.findOne(Param.id);
  }
  @Public()
  @Get()
  findAll() {
    return this.commentService.findAll();
  }
  @Roles('user')
  @Put(':id')
  update(@Param() Param: IdParamDto, @Body() data: UpdateCommentDto) {
    return this.commentService.update(Param.id, data);
  }
  @Roles('user')
  @Delete(':id')
  remove(@Param() Param: IdParamDto) {
    return this.commentService.remove(Param.id);
  }

  @Public()
  @Get('project/:project')
  project_comments(@Param('project') project: string) {
    return this.commentService.project_comments(project);
  }
  @Public()
  @Get('user/:user')
  user_comments(@Param('user') user: string) {
    return this.commentService.user_comments(user);
  }
}
