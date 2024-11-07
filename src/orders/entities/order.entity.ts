import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';

export class Order {
  id: string;
  menus: Menu[];
  prix: number;
  user: User;
}
