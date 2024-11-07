import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @ApiProperty({ description: 'The menus associated with the order', example: [1, 2, 3] })
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true }) 
    menus: number[];  
  
    @ApiProperty({ description: 'The total price of the order', example: 15.99 })
    @IsNotEmpty()
    @IsNumber()
    price: number;  
  
    @ApiProperty({ description: 'The ID of the user who placed the order', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    userId: number; 
}
