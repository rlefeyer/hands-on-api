import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from 'src/items/items.module';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersControllerV2 } from './orders.controller.v2';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), ItemsModule],
  controllers: [OrdersController, OrdersControllerV2],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
