// src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await (
    await NestFactory.create(AppModule)
  ).enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });

  const config = new DocumentBuilder()
    .setTitle('Deliveroo')
    .setDescription("Documentation de l'API Deliveroo")
    .setVersion('0.2')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(':version', app, document);

  await app.listen(3000);
}
bootstrap();
