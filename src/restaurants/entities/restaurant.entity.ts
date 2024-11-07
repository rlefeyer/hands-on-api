import { Menu } from '../../menus/entities/menu.entity';

export class Restaurant {
  id: number;
  nom: string;
  description: string;
  adresse: string;
  menus: Menu[]
  note: number;
  horaires: string;
}
