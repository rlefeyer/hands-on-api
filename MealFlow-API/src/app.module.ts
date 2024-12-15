import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Item } from './items/entities/item.entity';
import { Order } from './orders/entities/order.entity';
import { Menu } from './menus/entities/menu.entity';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-mealflow-debril-paul.f.aivencloud.com',
      port: 26020,
      username: 'avnadmin',
      password: '',
      database: 'mealflow',
      entities: [User,Restaurant,Menu,Item,Order],
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false, 
      },
    }),    
    TypeOrmModule.forFeature([]),
    RestaurantsModule,
    OrdersModule,
    UsersModule,
    MenusModule,
    ItemsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}