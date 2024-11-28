import { PartialType } from '@nestjs/swagger';
import { CreateOrdersv2Dto } from './create-ordersv2.dto';

export class UpdateOrdersv2Dto extends PartialType(CreateOrdersv2Dto) {}
