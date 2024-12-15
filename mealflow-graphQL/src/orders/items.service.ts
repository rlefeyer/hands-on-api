import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';
import { CreateItemDto } from 'src/items/dto/create-item.dto';
import { UpdateItemDto } from 'src/items/dto/update-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>, // Requête sur la table Item
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>, // Requête sur la table Restaurant
  ) {}

  // Create a new item
  async create(createItemDto: CreateItemDto): Promise<Item> {
    const { restaurantId, ...itemData } = createItemDto;

    // Vérifier si le restaurant existe
    const restaurant = await this.restaurantRepository.findOne({ where: { id: restaurantId } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${restaurantId} not found.`);
    }

    // Créer un nouvel item et l'associer au restaurant
    const newItem = this.itemRepository.create({
      ...itemData,
      restaurant,
    });

    return await this.itemRepository.save(newItem);
  }

  // Retrieve all items
  async findAll(): Promise<Item[]> {
    return await this.itemRepository.find();
  }

  // Retrieve an item by ID
  async findOne(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
    return item;
  }

  // Update an item by ID
  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const item = await this.findOne(id);

    if (updateItemDto.restaurantId) {
      // Vérifier si le restaurant existe si le restaurantId est fourni
      const restaurant = await this.restaurantRepository.findOne({ where: { id: updateItemDto.restaurantId } });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${updateItemDto.restaurantId} not found.`);
      }
      item.restaurant = restaurant;
    }

    Object.assign(item, updateItemDto);
    return await this.itemRepository.save(item);
  }

  // Delete an item by ID
  async remove(id: number): Promise<void> {
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found.`);
    }
  }
}
