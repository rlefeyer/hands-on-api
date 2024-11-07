import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [OrdersModule, RestaurantsModule, MenusModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
