import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  create(createItemDto: CreateItemDto): Item {
    const newItem: Item = {
      id: uuidv4(),
      ...createItemDto,
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: string): Item {
    const item = this.items.find((item) => item.id === id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  update(id: string, updateItemDto: UpdateItemDto): Item {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items[itemIndex] = { ...this.items[itemIndex], ...updateItemDto };
    return this.items[itemIndex];
  }

  remove(id: string): void {
    const itemIndex = this.items.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(itemIndex, 1);
  }
}
