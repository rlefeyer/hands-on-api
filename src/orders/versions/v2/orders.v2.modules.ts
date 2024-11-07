import { Module } from '@nestjs/common';
import { OrdersService } from '../../orders.service';
import {OrdersV2Controller} from "./orders.v2.controller";

@Module({
    controllers: [OrdersV2Controller],
    providers: [OrdersService],
})
export class OrdersModuleV2 {}
