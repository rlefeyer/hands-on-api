import { Item } from 'src/items/entities/item.entity';
export declare class CreateRestaurantDto {
    name: string;
    description?: string;
    adresse: string;
    items: Item[];
    note?: number;
    horaires?: string;
}
