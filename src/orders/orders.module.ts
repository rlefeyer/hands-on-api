import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersControllerV2 } from './orders.controller.v2';
import { OrdersService } from './orders.service';

@Module({
  controllers: [OrdersController, OrdersControllerV2],
  providers: [OrdersService],
})
export class OrdersModule {}
