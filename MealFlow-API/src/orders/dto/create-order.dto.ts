import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateOrderDto {
  
  @ApiProperty({ description: 'Menus associated with the order', example: [1, 2, 3] })
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each menu ID must be a number' }) 
  items: number[];

  @ApiProperty({ description: 'Total price of the order', example: 15.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' }) 
  price: number;

  @ApiProperty({ description: 'ID of the user who placed the order', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'User ID must be a positive number' }) 
  userId: number;
}
