import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import {User} from "./user/entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import { RestaurantModule } from './restaurant/restaurant.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import * as dotenv from "dotenv";
import {Restaurant} from "./restaurant/entities/restaurant.entity";
import {Item} from "./items/entities/item.entity";
import {Order} from "./orders/entities/order.entity";

dotenv.config();

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), TypeOrmModule.forRoot({
    type: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    entities: [User, Restaurant, Item, Order],
    database: "food-delivery",
    synchronize: true,
    logging: true,
  }),
    UserModule,
    RestaurantModule,
    ItemsModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}