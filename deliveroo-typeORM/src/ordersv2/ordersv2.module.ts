import { Module } from '@nestjs/common';
import { Ordersv2Service } from './ordersv2.service';
import { Ordersv2Controller } from './ordersv2.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ordersv2 } from './entities/ordersv2.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ordersv2])],
  controllers: [Ordersv2Controller],
  providers: [Ordersv2Service],
})
export class Ordersv2Module {}
