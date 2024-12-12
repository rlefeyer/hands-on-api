import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';
import { Ordersv2Module } from './ordersv2/ordersv2.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Order } from './orders/entities/order.entity';
import { Menu } from './menus/entities/menu.entity';
import { Item } from './items/entities/item.entity';
import { Ordersv2 } from './ordersv2/entities/ordersv2.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'localhost',
      username: 'distrib',
      entities: [User, Restaurant, Order, Menu, Item, Ordersv2],
      database: 'postgres',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    RestaurantsModule,
    OrdersModule,
    MenusModule,
    ItemsModule,
    Ordersv2Module,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
