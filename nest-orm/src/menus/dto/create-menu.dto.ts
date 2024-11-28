import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ description: 'The name of the menu item' })
  @IsString()
  @IsNotEmpty()
  Name: string;

  @ApiProperty({ description: 'A short description of the menu item' })
  @IsString()
  @IsNotEmpty()
  Description: string;

  @ApiProperty({ description: 'The price of the menu item' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ description: 'The associated restaurant of the menu' })
  @IsString()
  @IsNotEmpty()
  Restaurant: string;
}
