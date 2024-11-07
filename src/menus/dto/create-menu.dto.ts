import { Restaurant } from "src/restaurants/entities/restaurant.entity";

export class CreateMenuDto {
    nom: string;
    description?: string;
    prix: number;
    restaurant: Restaurant;
}
