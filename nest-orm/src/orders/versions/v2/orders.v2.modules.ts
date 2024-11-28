import { Module } from '@nestjs/common';
import { OrdersService } from '../../orders.service';
import {OrdersV2Controller} from "./orders.v2.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Order} from "../../entities/order.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrdersV2Controller],
    providers: [OrdersService],
})
export class OrdersModuleV2 {}
