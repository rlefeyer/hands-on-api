import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Menu} from "./entities/menu.entity";
import {Repository} from "typeorm";

@Injectable()
export class MenusService {

  constructor(
      @InjectRepository(Menu)
        private readonly menusRepository: Repository<Menu>
  ) {
  }

  create(createMenuDto: CreateMenuDto) {
    const name = createMenuDto.name;
    const description = createMenuDto.description;
    const price = createMenuDto.prix;
    const Restaurant = createMenuDto.restaurant;
    return this.menusRepository.save({name, description, price, Restaurant});
  }

  findAll() {
    return `This action returns all menus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
