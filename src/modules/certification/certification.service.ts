import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Certification } from './certification.schema';
import CreateCertificationDto from './dto/create-certification.dto';
import UpdateCertificationDto from './dto/update-certification.dto';
import { CustomException } from 'src/exceptions/custom.exception';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class CertificationsService {
  constructor(
    @InjectModel(Certification.name)
    private readonly certificationModel: Model<Certification>,
    private readonly CloudinaryService: CloudinaryService,
  ) {}
  async findAll(): Promise<Certification[]> {
    return this.certificationModel.find().exec();
  }

  async create(
    data: CreateCertificationDto,
    buffer: Buffer,
  ): Promise<Certification> {
    if (!buffer) {
      throw new CustomException('certification image not found', 404);
    }
    const img = await this.CloudinaryService.upload_image(
      buffer,
      'certification',
    );
    data.image = img;
    const certification = new this.certificationModel(data);
    return certification.save();
  }

  async findOne(id: string): Promise<Certification> {
    const certification = await this.certificationModel.findById(id);
    if (!certification) {
      throw new CustomException('certification not found', 404);
    }
    return certification;
  }

  async update(
    id: string,
    data: UpdateCertificationDto,
    buffer: Buffer,
  ): Promise<Certification> {
    if (!data) {
      throw new CustomException('please choose data to update', 404);
    }
    const certification = await this.certificationModel.findById(id);
    if (buffer) {
      const public_id = certification.image.split('/')[9].replace('.png', '');
      const image = await this.CloudinaryService.replaceImage(
        public_id,
        'certification',
        buffer,
      );
      certification.image = image;
    }
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined) certification[key] = data[key];
    });
    await certification.save();
    if (!certification) {
      throw new CustomException('certification not found', 404);
    }
    return certification;
  }

  async remove(id: string) {
    const certification = await this.certificationModel.findByIdAndDelete(id);
    if (!certification) {
      throw new CustomException('certification not found', 404);
    }
    const url = certification.image.split('/');
    const public_id = `${url[url.length - 3]}/${url[url.length - 2]}/${url[url.length - 1].replace('.png', '')}`;
    await this.CloudinaryService.delete_image(public_id);
    return { message: 'certification deleted successfully' };
  }
}
