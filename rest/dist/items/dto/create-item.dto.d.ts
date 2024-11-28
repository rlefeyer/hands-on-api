import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class CreateItemDto {
    name: string;
    description?: string;
    price: number;
    restaurant: Restaurant;
}
