import { Restaurant } from '../../restaurants/entities/restaurant.entity';

export class Menu {
  id: number;
  nom: string;
  description: string;
  prix: number;
  restaurant: Restaurant
}
