import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantsRepository: Repository<Restaurant>,
  ) {}

  create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = this.restaurantsRepository.create(createRestaurantDto);
    return this.restaurantsRepository.save(restaurant);
  }

  findAll(name?: string, adresse?: string): Promise<Restaurant[]> {
    const queryBuilder =
      this.restaurantsRepository.createQueryBuilder('restaurant');

    if (name) {
      queryBuilder.andWhere('restaurant.name LIKE :name', {
        name: `%${name}%`,
      });
    }
    if (adresse) {
      queryBuilder.andWhere('restaurant.adresse LIKE :adresse', {
        adresse: `%${adresse}%`,
      });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsRepository.findOne({
      where: { id },
      relations: ['menus'],
    });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    Object.assign(restaurant, updateRestaurantDto);
    return this.restaurantsRepository.save(restaurant);
  }

  async remove(id: string): Promise<void> {
    const result = await this.restaurantsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Restaurant #${id} not found`);
    }
  }

  async addRating(id: string, rating: number): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    if (restaurant.note === 0) {
      restaurant.note = rating;
      return this.restaurantsRepository.save(restaurant);
    }
    throw new Error('La note a déjà été ajoutée à ce restaurant.');
  }
}
