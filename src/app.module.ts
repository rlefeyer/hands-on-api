import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { OrdersModule } from "./orders/orders.module";
import { MenusModule } from "./menus/menus.module";
import { RestaurantsModule } from "./restaurants/restaurants.module";
import { ItemsModule } from "./Items/items.module";
import { TypeOrmModule } from "@nestjs/typeorm";

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
      entities: [],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
