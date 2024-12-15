import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional, MinLength, Min, IsPositive } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class CreateMenuDto {

  @ApiProperty({ description: "Name of the menu", example: "BigMac" })
  @IsNotEmpty()
  @IsString()
  @MinLength(1, { message: 'The name must be at least 3 characters long' }) 
  name: string;

  @ApiProperty({ description: "Description of the menu", example: "El Famoso big mac" })
  @IsOptional() 
  @IsString()
  @MinLength(1, { message: 'The description must be at least 5 characters long' }) 
  description?: string;

  @ApiProperty({ description: "Price of the menu", example: 10.99 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'The price must be at least 0' }) 
  price: number;

  @ApiProperty({ description: "ID of the restaurant associated with this menu", example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive({ message: 'The restaurant ID must be a positive number' })
  restaurantId: number;
}
