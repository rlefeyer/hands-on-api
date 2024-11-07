import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({ description: 'Unique ID of the order', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;  
  
    @ApiProperty({ description: 'Menus associated with the order', example: [1, 2, 3] })
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, { each: true }) 
    menus: number[];  
  
    @ApiProperty({ description: 'Total price of the order', example: 15.99 })
    @IsNotEmpty()
    @IsNumber()
    price: number;  
  
    @ApiProperty({ description: 'ID of the user who placed the order', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    userId: number;  
}