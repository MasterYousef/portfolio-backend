import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Certification, CertificationSchema } from './certification.schema';
import { CertificationController } from './certification.controller';
import { CertificationsService } from './certification.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Certification.name, schema: CertificationSchema },
    ]),
  ],
  controllers: [CertificationController],
  providers: [CertificationsService, CloudinaryService],
})
export class CertificationModule {}
