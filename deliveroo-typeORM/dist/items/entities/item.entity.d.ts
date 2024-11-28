import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class Item {
    id: number;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    restaurant: Restaurant;
    restaurantId: number;
    constructor(partial: Partial<Item>);
}
