import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {VersioningType} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('DeliverooApi')
    .setDescription('Api for Deliveroo')
    .setVersion('0.1')
    .addTag('Users')
    .addTag('Orders')
    .addTag('Restaurants')
    .addTag('Menus')
    .addTag('Items')
    .build();

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, documentFactory);

  await app.listen(3000);
}
bootstrap();
