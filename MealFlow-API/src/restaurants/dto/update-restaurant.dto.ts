import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, IsNumber, IsArray, Min, Max } from 'class-validator';
import { Item } from 'src/items/entities/item.entity';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

  @ApiProperty({ description: 'Name of the restaurant', example: 'McDonald\'s' })
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' }) 
  name?: string;

  @ApiProperty({ description: 'Description of the restaurant', example: 'Fast food burgers and more' })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'The description must be at least 10 characters long' }) 
  description?: string;

  @ApiProperty({ description: 'Address of the restaurant', example: '1 Rue de Lille, Lille' })
  @IsOptional()
  @IsString()
  @MinLength(5, { message: 'The address must be at least 5 characters long' }) 
  address?: string;

  @ApiProperty({ description: 'IDs of the menus offered by the restaurant', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true, message: 'Each menu ID must be a number' }) 
  items?: Item[];

  @ApiProperty({ description: 'Average rating of the restaurant', example: 4.5 })
  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The rating must be at least 0' }) 
  @Max(5, { message: 'The rating must not exceed 5' }) 
  rating?: number;

  @ApiProperty({ description: 'Opening hours of the restaurant', example: 'Monday - Friday: 12 PM - 3 PM, 7 PM - 11 PM' })
  @IsOptional()
  @IsString()
  @MinLength(10, { message: 'The opening hours description must be at least 10 characters long' }) 
  openingHours?: string;
}
