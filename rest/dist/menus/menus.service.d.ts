import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
export declare class MenusService {
    private menus;
    create(createMenuDto: CreateMenuDto): Menu;
    findAll(): Menu[];
    findOne(id: string): Menu;
    update(id: string, updateMenuDto: UpdateMenuDto): Menu;
    remove(id: string): void;
}
