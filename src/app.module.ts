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
import "dotenv/config";
import * as process from "node:process";

@Module({
    imports: [OrdersModule, UserModule, RestaurantsModule, MenusModule, ItemsModule, TypeOrmModule.forRoot({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        entities: [User],
        database: "food-delivery",
        synchronize: true,
        logging: true,
    }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
