import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

interface FindAllOptions {
  page?: number;
  limit?: number;
  sort?: string;
  filter?: Record<string, any>;
}

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(newRestaurant);
  }

  async findAll(options?: FindAllOptions): Promise<Restaurant[]> {
    const { page = 1, limit = 10, sort, filter } = options || {};
  
 
    const findOptions: any = {
      skip: (page - 1) * limit, 
      take: limit, 
      where: {}, //
      order: {}, // 
    };
  
    if (filter) {
      for (const [field, value] of Object.entries(filter)) {
        findOptions.where[field] = value;
      }
    }
  
    if (sort) {
      const [sortField, sortOrder] = sort.split(':');
      if (sortField && sortOrder) {
        findOptions.order[sortField] = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';
      }
    }
  
    return await this.restaurantRepository.find(findOptions);
  }
  
  

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({ where: { id } });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }
    return restaurant;
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateRestaurantDto);
    return await this.restaurantRepository.save(restaurant);
  }

  async remove(id: number): Promise<void> {
    const result = await this.restaurantRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }
  }
}
