import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenusService } from './menus.service';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    create(createMenuDto: CreateMenuDto): import("./entities/menu.entity").Menu;
    findAll(): import("./entities/menu.entity").Menu[];
    findOne(id: string): import("./entities/menu.entity").Menu;
    update(id: string, updateMenuDto: UpdateMenuDto): import("./entities/menu.entity").Menu;
    remove(id: string): void;
}
