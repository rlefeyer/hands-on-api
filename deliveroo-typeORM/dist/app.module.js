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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const restaurants_module_1 = require("./restaurants/restaurants.module");
const orders_module_1 = require("./orders/orders.module");
const menus_module_1 = require("./menus/menus.module");
const items_module_1 = require("./items/items.module");
const ordersv2_module_1 = require("./ordersv2/ordersv2.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const restaurant_entity_1 = require("./restaurants/entities/restaurant.entity");
const order_entity_1 = require("./orders/entities/order.entity");
const menu_entity_1 = require("./menus/entities/menu.entity");
const item_entity_1 = require("./items/entities/item.entity");
const ordersv2_entity_1 = require("./ordersv2/entities/ordersv2.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                password: 'localhost',
                username: 'distrib',
                entities: [user_entity_1.User, restaurant_entity_1.Restaurant, order_entity_1.Order, menu_entity_1.Menu, item_entity_1.Item, ordersv2_entity_1.Ordersv2],
                database: 'postgres',
                synchronize: true,
                logging: true,
            }),
            users_module_1.UsersModule,
            restaurants_module_1.RestaurantsModule,
            orders_module_1.OrdersModule,
            menus_module_1.MenusModule,
            items_module_1.ItemsModule,
            ordersv2_module_1.Ordersv2Module,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map