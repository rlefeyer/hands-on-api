import { IsString, IsNumber, IsInt, IsNotEmpty, IsOptional, Min, Max, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMenuDto {
  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({ description: 'The unique identifier of the menu', example: 1 })
  id?: number;

  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @ApiProperty({ description: 'The name of the menu', example: 'Lunch Menu' })
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  @ApiPropertyOptional({ description: 'The description of the menu', example: 'A selection of lunch items' })
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @ApiProperty({ description: 'The price of the menu', example: 19.99 })
  price: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the restaurant associated with the menu', example: 1 })
  restaurantId: number;
}