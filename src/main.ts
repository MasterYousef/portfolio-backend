import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";
import { CustomExceptionFilter } from "./filters/CustomExceptionFilter";
import { ValidationPipe } from "@nestjs/common";
import { configDotenv } from "dotenv";
import fastifyMultipart from "@fastify/multipart";
import helmet from "@fastify/helmet";
import fastifyCsrf from "@fastify/csrf-protection";
import cors from "@fastify/cors";

configDotenv({ path: "./src/config/config.env" });
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  await app.register(cors, {
    origin: [process.env.FRONTEND_URL, "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    preflightContinue: false,
  });
  await app.register(fastifyMultipart, {
    limits: {
      fileSize: 1024 * 1024 * Number(process.env.MAX_FILE_SIZE),
    },
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );
  await app.register(helmet);
  await app.register(fastifyCsrf);
  app.setGlobalPrefix("api/v1");
  await app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
    console.log("listening on port " + process.env.PORT);
  });
}
bootstrap();
