import { ApiProperty } from '@nestjs/swagger';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class CreateItemDto {
  @ApiProperty({ description: 'Name of the item' })
  name: string;

  @ApiProperty({ description: 'Description of the item', required: false })
  description?: string;

  @ApiProperty({ description: 'Price of the item' })
  price: number;

  @ApiProperty({ description: 'Restaurant of the item' })
  restaurant: Restaurant;
}
