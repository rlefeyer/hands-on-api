"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const item_entity_1 = require("./items/entities/item.entity");
const items_module_1 = require("./items/items.module");
const menus_module_1 = require("./menus/menus.module");
const orders_module_1 = require("./orders/orders.module");
const restaurant_entity_1 = require("./restaurants/entities/restaurant.entity");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const user_entity_1 = require("./users/entities/user.entity");
const users_module_1 = require("./users/users.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            orders_module_1.OrdersModule,
            restaurants_module_1.RestaurantsModule,
            menus_module_1.MenusModule,
            users_module_1.UsersModule,
            items_module_1.ItemsModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [user_entity_1.User, restaurant_entity_1.Restaurant, item_entity_1.Item],
                synchronize: process.env.NODE_ENV !== 'production',
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map