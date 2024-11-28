import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menu } from './entities/menu.entity';
@Injectable()
export class MenusService {
  private menus: Menu[] = [];

  create(createMenuDto: CreateMenuDto): Menu {
    const newMenu: Menu = {
      id: uuidv4(),
      ...createMenuDto,
    };
    this.menus.push(newMenu);
    return newMenu;
  }

  findAll(): Menu[] {
    return this.menus;
  }

  findOne(id: string): Menu {
    const menu = this.menus.find((menu) => menu.id === id);
    if (!menu) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    return menu;
  }

  update(id: string, updateMenuDto: UpdateMenuDto): Menu {
    const menuIndex = this.menus.findIndex((menu) => menu.id === id);
    if (menuIndex === -1) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    this.menus[menuIndex] = { ...this.menus[menuIndex], ...updateMenuDto };
    return this.menus[menuIndex];
  }

  remove(id: string): void {
    const menuIndex = this.menus.findIndex((menu) => menu.id === id);
    if (menuIndex === -1) {
      throw new NotFoundException(`Menu with ID ${id} not found`);
    }
    this.menus.splice(menuIndex, 1);
  }
}
