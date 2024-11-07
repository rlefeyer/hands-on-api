import { Menu } from 'src/menus/entities/menu.entity';
export declare class Restaurant {
    id: number;
    name: string;
    description?: string;
    address: string;
    menus?: Menu[];
    rating?: number;
    openingHours?: string;
}
