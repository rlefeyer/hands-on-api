import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Order {
    id: number;
    menus: Menu[];
    totalPrice: number;
    user: User;
    constructor(partial: Partial<Order>);
}
