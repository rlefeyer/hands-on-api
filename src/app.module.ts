import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [RestaurantsModule, MenusModule, OrdersModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
