import { PartialType } from '@nestjs/mapped-types';
import { CreateRestaurantDto } from './create-restaurant.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateRestaurantDto extends PartialType(CreateRestaurantDto) {
  @ApiProperty({ description: 'The name of the restaurant' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'A short description of the restaurant' })
  @IsString()
  @IsNotEmpty()
  Description: string;

  @ApiProperty({ description: 'The address of the restaurant' })
  @IsString()
  @IsNotEmpty()
  Address: string;

  @ApiProperty({
    description: 'List of menus offered by the restaurant',
    type: [String],
  })
  @IsArray()
  @IsNotEmpty()
  Menus: string[];

  @ApiProperty({ description: 'Rating or note given to the restaurant' })
  @IsString()
  @IsNotEmpty()
  Note: string;

  @ApiProperty({ description: 'Operating hours of the restaurant' })
  @IsString()
  @IsNotEmpty()
  Schedules: string;
}
