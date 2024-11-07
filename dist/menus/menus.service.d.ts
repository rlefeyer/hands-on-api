import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusService {
    menus: any[];
    create(createMenuDto: CreateMenuDto): Promise<{
        id: number;
        name: string;
        description?: string;
        price: number;
        restaurantId: number;
    }>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<any>;
    remove(id: number): Promise<void>;
}
