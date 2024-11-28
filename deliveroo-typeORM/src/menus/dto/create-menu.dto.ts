import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({
    example: 'Pizza Margherita',
    description: 'Le nom du plat au menu',
  })
  @IsString()
  @IsNotEmpty({ message: 'Le nom du menu est obligatoire.' })
  name: string;

  @ApiProperty({
    example: 'Une délicieuse pizza garnie de tomates fraîches et de mozzarella',
    description: 'Une brève description du plat au menu',
  })
  @IsString()
  @IsNotEmpty({ message: 'La description du menu est obligatoire.' })
  description: string;

  @ApiProperty({
    example: 15.99,
    description: 'Le prix du plat en euros',
  })
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @IsPositive({ message: 'Le prix doit être positif.' })
  price: number;

  @ApiProperty({
    example: 1,
    description: "L'ID du restaurant auquel appartient ce menu",
  })
  @IsNumber({}, { message: "L'ID du restaurant doit être un nombre." })
  @IsPositive({ message: "L'ID du restaurant doit être un nombre positif." })
  restaurantId: number;
}
