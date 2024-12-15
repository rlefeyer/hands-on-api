import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/user.module';
import { MenuModule } from './menus/menu.module';
import { OrdersResolver } from './orders/orders.resolver';
import { ItemsResolver } from './items/items.resolver';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsService } from './restaurants/restaurants.service';
import { MenuResolver } from './menus/menu.resolver';
import { RestaurantsResolver } from './restaurants/restaurants.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver, 
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Génère le fichier de schéma GraphQL
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-mealflow-debril-paul.f.aivencloud.com',
      port: 26020,
      username: 'avnadmin',
      password: '',
      database: 'mealflow',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    UserModule, 
    MenuModule, 
    RestaurantsModule, 
    ItemsModule, 
    OrdersModule

  ],
  controllers: [AppController],
  providers: [AppService, OrdersResolver, ItemsResolver, RestaurantsResolver, MenuResolver] ,
})
export class AppModule {}
