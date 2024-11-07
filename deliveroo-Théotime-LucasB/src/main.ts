import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
 
async function bootstrap() {
  const app = (await NestFactory.create(AppModule)).enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'api/v',
  });
 
  const config = new DocumentBuilder()
    .setTitle('Deliveroo API')
    .setDescription('The Deliveroo API description')
    .setVersion('0.1')
    .build();
 
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
 
  await app.listen(3000);
}
bootstrap();

