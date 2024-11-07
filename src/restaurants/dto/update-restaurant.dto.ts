import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {

  @ApiProperty({ description: 'Name of the restaurant', example: 'McDonald\'s' })
  @IsNotEmpty()
  @IsString()
  name: string;  

  @ApiProperty({ description: 'Description of the restaurant', example: 'Fast food burgers and more' })
  @IsOptional()
  @IsString()
  description?: string;  

  @ApiProperty({ description: 'Address of the restaurant', example: '1 Rue de Lille, Lille' })
  @IsNotEmpty()
  @IsString()
  address: string;  

  @ApiProperty({ description: 'IDs of the menus offered by the restaurant', example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  menus?: number[]; 

  @ApiProperty({ description: 'Average rating of the restaurant', example: 4.5 })
  @IsOptional()
  @IsNumber()
  rating?: number;  

  @ApiProperty({ description: 'Opening hours of the restaurant', example: 'Monday - Friday: 12 PM - 3 PM, 7 PM - 11 PM' })
  @IsOptional()
  @IsString()
  openingHours?: string;
}
