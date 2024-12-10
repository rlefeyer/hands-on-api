import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ description: 'The name of the order' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'List of menus included in the order', type: [String] })
  @IsArray()
  @IsNotEmpty()
  menus: string[];

  @ApiProperty({ description: 'The total price of the order' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ description: 'The user who placed the order' })
  @IsString()
  @IsNotEmpty()
  user: string;
}
