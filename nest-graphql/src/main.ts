import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HeadersMiddleware } from './headers.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new HeadersMiddleware().use);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
