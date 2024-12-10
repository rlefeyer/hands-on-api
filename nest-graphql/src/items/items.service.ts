import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item } from './entities/item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from '../restaurant/entities/restaurant.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepo: Repository<Restaurant>,
  ) {}

  async create(createItemInput: CreateItemInput): Promise<Item> {
    try {
      console.log('Finding restaurant with ID:', createItemInput.restaurantId);
      const restaurant = await this.restaurantRepo.findOne({ where: { id: createItemInput.restaurantId } });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${createItemInput.restaurantId} not found`);
      }

      console.log('Creating new item with input:', createItemInput);
      const newItem = this.repo.create({
        ...createItemInput,
        restaurant,
      });
      console.log('Saving new item:', newItem);
      const savedItem = await this.repo.save(newItem);
      console.log('Saved item:', savedItem);
      return savedItem;
    } catch (error) {
      console.error('Error creating item:', error);
      throw new InternalServerErrorException('Failed to create item');
    }
  }

  async findAll(): Promise<Item[]> {
    try {
      return await this.repo.find({ relations: ['restaurant', 'restaurant.category'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve items');
    }
  }

  async findOne(id: number): Promise<Item> {
    try {
      const item = await this.repo.findOne({ where: { id }, relations: ['restaurant', 'restaurant.category'] });
      if (!item) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return item;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve item');
    }
  }

  async update(id: number, updateItemInput: UpdateItemInput): Promise<Item> {
    try {
      await this.repo.update(id, updateItemInput);
      const updatedItem = await this.findOne(id);
      if (!updatedItem) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return updatedItem;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update item');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.repo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Item with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete item');
    }
  }
}