import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createRestaurantInput: CreateRestaurantInput): Promise<Restaurant> {
    try {
      const category = await this.categoryRepository.findOneBy({ id: createRestaurantInput.categoryId });
      if (!category) {
        throw new NotFoundException(`Category with ID ${createRestaurantInput.categoryId} not found`);
      }
      const newRestaurant = this.restaurantRepository.create({
        ...createRestaurantInput,
        category,
      });
      return await this.restaurantRepository.save(newRestaurant);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create restaurant');
    }
  }

  async findAll(): Promise<Restaurant[]> {
    try {
      return await this.restaurantRepository.find({ relations: ['category', 'menu', 'items'] });
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve restaurants');
    }
  }

  async findOne(id: number): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepository.findOne({ where: { id }, relations: ['category', 'menu', 'items'] });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      return restaurant;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve restaurant');
    }
  }

  async update(id: number, updateRestaurantInput: UpdateRestaurantInput): Promise<Restaurant> {
    try {
      const category = await this.categoryRepository.findOneBy({ id: updateRestaurantInput.categoryId });
      if (!category) {
        throw new NotFoundException(`Category with ID ${updateRestaurantInput.categoryId} not found`);
      }
      const result = await this.restaurantRepository.update(id, {
        ...updateRestaurantInput,
        category,
      });
      if (result.affected === 0) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      const updatedRestaurant = await this.findOne(id);
      return updatedRestaurant;
    } catch (error) {
      throw new InternalServerErrorException('Failed to update restaurant');
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const result = await this.restaurantRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      return true;
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete restaurant');
    }
  }
}