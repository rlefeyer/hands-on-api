import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, Min, IsPositive } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

  @ApiProperty({ description: 'The menus associated with the order', example: [1, 2, 3] })
  @IsOptional() 
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each menu ID must be a number' })
  items?: number[];

  @ApiProperty({ description: 'The total price of the order', example: 15.99 })
  @IsOptional() 
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' })
  price?: number;

  @ApiProperty({ description: 'The ID of the user who placed the order', example: 1 })
  @IsOptional() 
  @IsNumber()
  @IsPositive({ message: 'User ID must be a positive number' })
  userId?: number;
}
