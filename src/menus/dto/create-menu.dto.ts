import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateMenuDto {
  @ApiProperty({
    description: 'Nom du menu',
    type: String
  })
  @IsString()
  nom: string;
  @ApiProperty({
    description: 'Description du menu',
    type: String
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Prix du menu',
    type: Number
  })
  @IsNumber()
  prix: number;
  @ApiProperty({
    description: 'Restaurant du menu',
    type: [Restaurant]
  })
  @ValidateNested({ each: true })
  @Type(() => Restaurant)
  restaurant: Restaurant
}
