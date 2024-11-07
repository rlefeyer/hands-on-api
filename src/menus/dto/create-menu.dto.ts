import { Restaurant } from '../../restaurants/entities/restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ example: "La merguez de l'espace", required: true })
  name: string;
  @ApiProperty({
    example: "La merguez de l'espace, un must have",
    required: false,
  })
  description: string | null;
  @ApiProperty({ example: 12.99, required: true })
  price: number;
  @ApiProperty({ example: 1, required: true })
  restaurant: Restaurant;
}
