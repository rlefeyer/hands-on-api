import { Item } from 'src/items/entities/item.entity';
import { Menu } from 'src/menus/entities/menu.entity';
export declare class Order {
    id: string;
    menus: Menu[];
    items?: Item[];
    prix: number;
    status: string;
    createdAt: Date;
}
