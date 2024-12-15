import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, MinLength, Min, IsPositive } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  
  @ApiProperty({ description: "Name of the item", example: "BigMac" })
  @IsOptional() 
  @IsString()
  @MinLength(3, { message: 'The name must be at least 3 characters long' }) 
  name?: string;

  @ApiProperty({ description: "Description of the item", example: "El Famoso big mac" })
  @IsOptional() 
  @IsString()
  @MinLength(5, { message: 'The description must be at least 5 characters long' }) 
  description?: string;

  @ApiProperty({ description: "Price of the item", example: 10.99 })
  @IsOptional() 
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' }) 
  price?: number;

  @ApiProperty({ description: "ID of the restaurant associated with this item", example: 1 })
  @IsOptional() 
  @IsNumber()
  @IsPositive({ message: 'The restaurant ID must be a positive number' })
  restaurantId?: number;
}
