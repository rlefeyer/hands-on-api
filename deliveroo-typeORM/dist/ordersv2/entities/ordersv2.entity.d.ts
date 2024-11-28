import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Ordersv2 {
    id: number;
    items: Item[];
    totalPrice: number;
    user: User;
    constructor(partial: Partial<Ordersv2>);
}
