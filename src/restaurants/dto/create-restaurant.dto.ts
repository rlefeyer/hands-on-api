import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Nom restaurant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description du restaurant' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Adresse du restaurant' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Menus du restaurant', type: [String] })
  @IsArray()
  @IsNotEmpty()
  menus: string[];

  @ApiProperty({ description: 'Note du restaurant' })
  @IsString()
  @IsNotEmpty()
  note: string;

  @ApiProperty({ description: 'Horaires du restaurant' })
  @IsString()
  @IsNotEmpty()
  schedules: string;
}
