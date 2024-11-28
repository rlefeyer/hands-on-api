import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class Item {
    id: string;
    name: string;
    description?: string;
    price: number;
    restaurant: Restaurant;
}
