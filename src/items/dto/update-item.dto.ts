import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class UpdateItemDto {
  @ApiProperty({ description: 'Name of the item', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Description of the item', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Price of the item', required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Restaurant ID', required: false })
  @IsUUID()
  @IsOptional()
  restaurant?: Restaurant;
}
