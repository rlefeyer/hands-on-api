import { IsString, IsInt, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateMenuDto {
  @IsOptional()
  @IsInt()
  @ApiProperty({ description: 'The unique identifier of the menu', example: 1 })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the menu', example: 'Lunch Menu' })
  name: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'The description of the menu', example: 'A selection of lunch items' })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The price of the menu', example: 19.99 })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the restaurant associated with the menu', example: 1 })
  restaurantId: number;
}