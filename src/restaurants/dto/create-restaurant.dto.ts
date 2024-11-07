import { Menu } from "src/menus/entities/menu.entity";

export class CreateRestaurantDto {
    nom: string;
    description?: string;
    adresse: string;
    menus: Menu[];
    note?: number;
    horaires?: string;
}
