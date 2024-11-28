import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Item} from "../items/entities/item.entity";
import {Repository} from "typeorm";
import {Menu} from "./entities/menu.entity";

@Injectable()
export class MenusService {

  constructor(
      @InjectRepository(Menu) private readonly menuRepository: Repository<Menu>,
  ) {
  }

  create(createMenuDto: CreateMenuDto) {
    // return this.menuRepository.create(createMenuDto);
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
