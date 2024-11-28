import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {Item} from "./entities/item.entity";

@Injectable()
export class ItemsService {

  constructor(
      @InjectRepository(Item) private readonly itemRepository: Repository<Item>,
  ) {
  }

  async create(createItemDto: CreateItemDto) {
    await this.itemRepository.createQueryBuilder().insert().into(Item).values(createItemDto).execute();

  }

  findAll() {
    return this.itemRepository.find()
  }

  findOne(id: string) {
    return this.itemRepository.findOne({where: {id}});
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemRepository.update(id, updateItemDto).then(() => {
      return this.itemRepository.findOne({where: {id}});
    });
  }

  async remove(id: string) {
    return this.itemRepository.delete(id).then((item) => {
      return item.affected >= 1;
    });
  }
}
