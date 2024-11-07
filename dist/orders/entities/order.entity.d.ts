import { Menu } from 'src/menus/entities/menu.entity';
export declare class Order {
    id: number;
    menus: Menu[];
    price: number;
    userId: number;
}
