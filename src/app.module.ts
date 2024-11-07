import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [OrdersModule, UserModule, RestaurantsModule, MenusModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
