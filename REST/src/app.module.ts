import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from "./orders/orders.module";
import { MenusModule } from "./menus/menus.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { ItemsModule } from "./Items/items.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import * as dotenv from "dotenv";
import * as process from "node:process";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    OrdersModule,
    MenusModule,
    RestaurantsModule,
    ItemsModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "deliveroodb-clement-28ce.f.aivencloud.com",
      port: 14466,
      username: "avnadmin",
      database: "defaultdb",
      password: process.env.DATABASE_PASSWORD,
      entities: [User],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
