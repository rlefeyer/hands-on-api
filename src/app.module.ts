import { Module } from '@nestjs/common';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { UsersModule } from './users/users.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [OrdersModule, RestaurantsModule, MenusModule, UsersModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
