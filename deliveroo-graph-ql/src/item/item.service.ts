import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  async findOne(id: number): Promise<Item> {
    return await this.itemRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }
}
