import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SkillModule } from './modules/skill/skills.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { configDotenv } from 'dotenv';
import { ProjectModule } from './modules/project/project.module';
import { ResInterceptor } from './interceptors/res.interceptor';
import { CommentModule } from './modules/comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { EmailModule } from './email/email.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

configDotenv({ path: './src/config/config.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './config/config.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_KEY'),
      }),
      inject: [ConfigService],
    }),
    EmailModule.forRoot({
      host: 'EMAIL_HOST',
      port: 'EMAIL_PORT',
      secure: true,
      auth: {
        user: 'EMAIL_USER',
        pass: 'EMAIL_PASS',
      },
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    SkillModule,
    ProjectModule,
    CommentModule,
    EmailModule,
  ],
  providers: [
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResInterceptor,
    },
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard,
    },
    CloudinaryService,
  ],
})
export class AppModule {}
