import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ description: 'Name of the menu' })
  name: string;

  @ApiProperty({ description: 'Description of the menu', required: false })
  description?: string;

  @ApiProperty({ description: 'Price of the menu' })
  prix: number;

  @ApiProperty({ description: 'Associated restaurant', type: () => Restaurant })
  restaurant: Restaurant;
}
