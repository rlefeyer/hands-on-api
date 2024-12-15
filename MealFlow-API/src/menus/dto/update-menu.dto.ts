import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, MinLength, Min, IsPositive } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
  
  @ApiProperty({ description: "Name of the menu", example: "BigMac" })
  @IsOptional() 
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' }) 
  name?: string;

  @ApiProperty({ description: "Description of the menu", example: "El Famoso big mac" })
  @IsOptional() 
  @IsString()
  @MinLength(5, { message: 'The description must be at least 5 characters long' }) 
  description?: string;

  @ApiProperty({ description: "Price of the menu", example: 10.99 })
  @IsOptional() 
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' }) 
  price?: number;

  @ApiProperty({ description: "ID of the restaurant associated with this menu", example: 1 })
  @IsNumber()
  @IsPositive({ message: 'The restaurant ID must be a positive number' })
  restaurantId: number;
}
