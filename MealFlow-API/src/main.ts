import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer le versionnement
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Configuration Swagger pour la version 1
  const configV1 = new DocumentBuilder()
    .setTitle('API Documentation V1')
    .setDescription('Version 1 de la documentation de l\'API - Paul Debril, Marine Langrez et Corentin Crépin')
    .setVersion('1.0')
    .build();
  const documentV1 = SwaggerModule.createDocument(app, configV1, {
    include: [MenusModule,UsersModule,OrdersModule,RestaurantsModule], // Inclure uniquement le modules modules nécessaires sans items
  });
  SwaggerModule.setup('api/v1', app, documentV1);

  // Configuration Swagger pour la version 2
  const configV2 = new DocumentBuilder()
    .setTitle('API Documentation V2')
    .setDescription('Version 2 de la documentation de l\'API - Paul Debril, Marine Langrez et Corentin Crépin')
    .setVersion('2.0')
    .build();
  const documentV2 = SwaggerModule.createDocument(app, configV2);
  SwaggerModule.setup('api/v2', app, documentV2);

  await app.listen(5017);
  console.log(`Application is running on: ${await app.getUrl()}`);

  console.log(`Swagger documentation is available on:
  - ${await app.getUrl()}/api/v1
  - ${await app.getUrl()}/api/v2`);

  console.log('Made with ❤️ by Paul Debril, Marine Langrez et Corentin Crépin');
}

bootstrap();