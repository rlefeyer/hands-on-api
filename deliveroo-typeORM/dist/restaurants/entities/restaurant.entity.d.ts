import { Item } from 'src/items/entities/item.entity';
export declare class Restaurant {
    id: number;
    name: string;
    description?: string;
    address: string;
    category: string;
    items: Item[];
    rating: number;
    hours: string;
    constructor(partial: Partial<Restaurant>);
}
