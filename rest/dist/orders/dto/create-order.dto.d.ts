import { Menu } from 'src/menus/entities/menu.entity';
import { User } from 'src/users/entities/user.entity';
declare class OrderItemDto {
    itemId: string;
    quantity: number;
}
export declare class CreateOrderDto {
    menus?: Menu[];
    items?: OrderItemDto[];
    prix: number;
    user: User;
}
export {};
