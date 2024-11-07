import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';

export class Item {
    @ApiProperty({ description: 'The unique identifier of the item', example: 1 })
    id: number;

    @ApiProperty({ description: 'The name of the item', example: 'Burger' })
    name: string;

    @ApiPropertyOptional({ description: 'The description of the item', example: 'A delicious beef burger' })
    description?: string;

    @ApiProperty({ description: 'The price of the item', example: 9.99 })
    price: number;

    @ApiProperty({ description: 'The restaurant associated with the item' })
    restaurant: Restaurant;

    constructor(id: number, name: string, price: number, restaurant: Restaurant, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.restaurant = restaurant;
        this.description = description;
    }
}