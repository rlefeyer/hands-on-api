import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [RestaurantsModule, OrdersModule, UsersModule, MenusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
