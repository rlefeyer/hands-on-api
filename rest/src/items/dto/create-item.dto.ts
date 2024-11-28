import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Description of the item', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the item' })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Restaurant ID' })
  @IsUUID()
  @IsNotEmpty()
  restaurant: Restaurant;
}
