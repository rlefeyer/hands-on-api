import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'The name of the menu item' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'A short description of the menu item' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'The price of the menu item' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ description: 'The associated restaurant of the menu' })
  @IsString()
  @IsNotEmpty()
  restaurant: string;
}
