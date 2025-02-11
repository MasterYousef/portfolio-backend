import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorator/public.decorator';
import { CertificationsService } from './certification.service';
import CreateCertificationDto from './dto/create-certification.dto';
import UpdateCertificationDto from './dto/update-certification.dto';
import { File } from 'src/decorator/file.decorator';
import errors from 'src/validations/file.validation';
import { plainToInstance } from 'class-transformer';
import IdParamDto from 'src/validations/id-param.dto';
@Controller('certifications')
@UseGuards(AuthGuard)
export class CertificationController {
  constructor(private readonly certificationsService: CertificationsService) {}
  @Roles('admin')
  @Post()
  async create(@Req() req: Request, @File() buffer: Buffer) {
    const data = plainToInstance(CreateCertificationDto, req.body, {
      excludeExtraneousValues: true,
    });
    await errors(data);
    return this.certificationsService.create(data, buffer);
  }
  @Public()
  @Get()
  findAll() {
    return this.certificationsService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param() Param: IdParamDto) {
    return this.certificationsService.findOne(Param.id);
  }
  @Roles('admin')
  @Put(':id')
  async update(
    @Req() req: Request,
    @File() buffer: Buffer,
    @Param() Param: IdParamDto,
  ) {
    const data = plainToInstance(UpdateCertificationDto, req.body, {
      excludeExtraneousValues: true,
    });
    await errors(data);
    return this.certificationsService.update(Param.id, data, buffer);
  }
  @Roles('admin')
  @Delete(':id')
  remove(@Param() Param: IdParamDto) {
    return this.certificationsService.remove(Param.id);
  }
}
