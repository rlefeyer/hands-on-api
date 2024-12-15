import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';
import { OrdersResolver } from 'src/orders/orders.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,Item,User,Menu]), 
  ],
  providers: [
    OrdersService,
    OrdersResolver,
  ],
    exports: [
      OrdersService, 
    ]
})
export class OrdersModule {}