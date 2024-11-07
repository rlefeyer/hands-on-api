import { Menu } from 'src/menus/entities/menu.entity';

export class Restaurant {
  id: string;
  nom: string;
  description?: string;
  adresse: string;
  menus: Menu[];
  note?: number;
  horaires?: string;
}
