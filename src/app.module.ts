import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { UserModule } from './user/user.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [OrdersModule, UserModule, RestaurantsModule, MenusModule, ItemsModule,  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '22052003paul',
    database: 'food-delivery',
    synchronize: true,
    logging: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
