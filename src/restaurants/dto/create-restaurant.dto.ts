import { Menu } from '../../menus/entities/menu.entity';
import { IsArray, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'Nom du restaurant',
    type: String
  })
  @IsString()
  nom: string;
  @ApiProperty({
    description: 'Description du restaurant',
    type: String
  })
  @IsString()
  description: string;
  @ApiProperty({
    description: 'Adresse du restaurant',
    type: String
  })
  @IsString()
  adresse: string;
  @ApiProperty({
    description: 'Menus du restaurant',
    type: [Menu]
  })
  @ValidateNested({ each: true })
  @Type(() => Menu)
  menus: Menu[]
  @ApiProperty({
    description: 'Note du restaurant',
    type: Number
  })
  @IsNumber()
  note: number;
  @ApiProperty({
    description: 'Horaires du restaurant',
    type: String
  })
  @IsString()
  horaires: string;
}
