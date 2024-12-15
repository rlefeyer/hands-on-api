import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order,Item,User,Menu]), 
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
