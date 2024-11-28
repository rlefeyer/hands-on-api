import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Menu } from 'src/menus/entities/menu.entity';

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(30, { message: 'Name must be at most 30 characters long' })
  @Matches(/^[a-zA-Z0-9\s]*$/, {
    message: 'Name must contain only letters, numbers and spaces',
  })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Address must be at least 3 characters long' })
  @MaxLength(100, { message: 'Address must be at most 100 characters long' })
  adresse: string;

  @IsArray()
  menus: Menu[];

  @IsNumber()
  @IsOptional()
  note?: number;

  @IsString()
  @IsOptional()
  horaires?: string;
}
