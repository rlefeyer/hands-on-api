import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ){}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    try {
      const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
      return await this.restaurantRepository.save(newRestaurant);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create restaurant');
    }
  }

  async findAll(): Promise<Restaurant[]> {
    try {
      return await this.restaurantRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve restaurants');
    }
  }

  async findOne(id: number): Promise<Restaurant> {
    try {
      const restaurant = await this.restaurantRepository.findOneBy({ id });
      if (!restaurant) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
      return restaurant;
    } catch (error) {
      throw new InternalServerErrorException('Failed to retrieve restaurant');
    }
  }

  async update(id: number, updateRestaurantDto: UpdateRestaurantDto): Promise<Restaurant> {
    try {
      await this.restaurantRepository.update(id, updateRestaurantDto);
      const updatedRestaurant = await this.findOne(id);
      if (!updatedRestaurant) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedRestaurant;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Failed to update restaurant');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const result = await this.restaurantRepository.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Restaurant with ID ${id} not found`);
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete restaurant');
    }
  }
}
