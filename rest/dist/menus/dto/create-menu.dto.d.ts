import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
export declare class CreateMenuDto {
    name: string;
    description?: string;
    prix: number;
    restaurant: Restaurant;
}
