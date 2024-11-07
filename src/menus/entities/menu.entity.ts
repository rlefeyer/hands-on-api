import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

export class Menu {
  id: string;
  nom: string;
  description?: string;
  prix: number;
  restaurant: Restaurant;
}
