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
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  // Créer un nouveau restaurant
  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(createRestaurantDto);
    return await this.restaurantRepository.save(newRestaurant);
  }

  // Récupérer tous les restaurants
  async findAll(): Promise<Restaurant[]> {
    return await this.restaurantRepository.find();
  }

  // Récupérer un restaurant par son ID
  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOneBy({ id });
    if (!restaurant) {
      throw new NotFoundException(`Restaurant avec l'ID ${id} non trouvé.`);
    }
    return restaurant;
  }

  // Mettre à jour un restaurant
  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    const restaurant = await this.findOne(id);
    const updatedRestaurant = { ...restaurant, ...updateRestaurantDto };
    await this.restaurantRepository.update(id, updatedRestaurant);
    return this.restaurantRepository.findOneBy({ id });
  }

  // Supprimer un restaurant
  async remove(id: number): Promise<void> {
    const restaurant = await this.findOne(id);
    await this.restaurantRepository.remove(restaurant);
  }
}
