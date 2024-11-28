import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class Menu {
    id: string;
    name: string;
    description?: string;
    prix: number;
    restaurant: Restaurant;
}
