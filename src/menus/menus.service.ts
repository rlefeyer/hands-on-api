import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  menus = [];

  // Create a new menu
  create(createMenuDto: CreateMenuDto) {
    const newMenu = { ...createMenuDto };
    this.menus.push(newMenu);
    return Promise.resolve(newMenu);
  }

  // Retrieve all menus
  findAll() {
    return Promise.resolve(this.menus);
  }

  // Retrieve a menu by ID
  findOne(id: number) {
    const menu = this.menus.find(menu => menu.id === id);
    return Promise.resolve(menu);
  }

  // Update a menu by ID
  update(id: number, updateMenuDto: UpdateMenuDto) {
    const menu = this.menus.find(menu => menu.id === id);
    if (menu) {
      Object.assign(menu, updateMenuDto);
    }
    return Promise.resolve(menu);
  }

  // Delete a menu by ID
  remove(id: number) {
    this.menus = this.menus.filter(menu => menu.id !== id);
    return Promise.resolve();
  }
}
