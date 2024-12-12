import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {OrdersModule} from "./orders/orders.module";
import {UserModule} from "./user/user.module";
import {RestaurantsModule} from "./restaurants/restaurants.module";
import {MenusModule} from "./menus/menus.module";
import {ItemsModule} from "./items/items.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user/entities/user.entity";
import * as dotenv from "dotenv";
import {Order} from "./orders/entities/order.entity";
import {Menu} from "./menus/entities/menu.entity";
import {Item} from "./items/entities/item.entity";
import {Restaurant} from "./restaurants/entities/restaurant.entity";
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
    imports: [OrdersModule, UserModule, RestaurantsModule, MenusModule, ItemsModule, TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        entities: [User, Order, Menu, Item, Restaurant],
        database: "food-delivery",
        synchronize: true,
        logging: true,
    }),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
