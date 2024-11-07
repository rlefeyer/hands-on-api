import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateMenuDto extends PartialType(CreateMenuDto) {
    
    @ApiProperty({ description: "Name of the menu", example: "BigMac" })
    @IsNotEmpty()
    @IsString()
    name: string;  
  
    @ApiProperty({ description: "Description of the menu", example: "El Famoso big mac" })
    @IsString()
    description?: string;  
  
    @ApiProperty({ description: "Price of the menu", example: 10.99 })
    @IsNotEmpty()
    @IsNumber()
    price: number;  
  
    @ApiProperty({ description: "ID of the restaurant associated with this menu", example: 1 })
    @IsNotEmpty()
    @IsNumber()
    restaurantId: number;  
}