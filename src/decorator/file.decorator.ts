import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { CustomException } from 'src/exceptions/custom.exception';
export const File = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    let file: Buffer<ArrayBufferLike>;
    let body = {};
    const parts = req.parts();
    for await (const part of parts) {
      if (part.type === 'file') {
        if (!part.mimetype.startsWith('image/')) {
          throw new CustomException('Invalid image ', 401);
        }
        file = await part.toBuffer();
      } else {
        body[part.fieldname] = part.value;
      }
    }
    req.body = body;
    return file;
  },
);
