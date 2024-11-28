import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiPropertyOptional({ description: 'The name of the order (optional)' })
  Name?: string;

  @ApiPropertyOptional({ description: 'List of menus included in the order (optional)', type: [String] })
  Menus?: string[];

  @ApiPropertyOptional({ description: 'The total price of the order (optional)' })
  price?: string;

  @ApiPropertyOptional({ description: 'The user who placed the order (optional)' })
  User?: string;
}
