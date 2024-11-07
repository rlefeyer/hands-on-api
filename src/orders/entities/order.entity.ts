import { Menu } from '../../menus/entities/menu.entity';
import { User } from '../../users/entities/user.entity';

export class Order {
  id: number;
  menus: Menu[];
  prix: number;
  user: User;
}
