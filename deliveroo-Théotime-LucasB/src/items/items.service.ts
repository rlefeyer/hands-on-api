import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({ id: createItemDto.restaurantId });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${createItemDto.restaurantId} not found`);
      }
      const newItem = this.itemRepository.create({
        ...createItemDto,
        restaurant,
      });
      return await this.itemRepository.save(newItem);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create item');
    }
  }

  async findAll(): Promise<Item[]> {
    try {
      return await this.itemRepository.find({ relations: ['restaurant'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve items');
    }
  }

  async findOne(id: number): Promise<Item> {
    try {
      const item = await this.itemRepository.findOne({ where: { id }, relations: ['restaurant'] });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve item');
    }
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({ id: updateItemDto.restaurantId });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${updateItemDto.restaurantId} not found`);
      }
      delete updateItemDto.restaurantId;
      const result = await this.itemRepository.update(id, {
        ...updateItemDto, restaurant
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      const updatedItem = await this.findOne(id);
      return updatedItem;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update item');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.itemRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete item');
    }
  }
}
