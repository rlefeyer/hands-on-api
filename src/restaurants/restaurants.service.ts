import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
@Injectable()
export class RestaurantsService {
  private restaurants: Restaurant[] = [];

  create(createRestaurantDto: CreateRestaurantDto): Restaurant {
    const newRestaurant: Restaurant = {
      id: uuidv4(),
      ...createRestaurantDto,
      note: 0,
    };
    this.restaurants.push(newRestaurant);
    return newRestaurant;
  }

  findAll(): Restaurant[] {
    return this.restaurants;
  }

  findOne(id: string): Restaurant {
    const restaurant = this.restaurants.find(
      (restaurant) => restaurant.id === id,
    );
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    return restaurant;
  }

  update(id: string, updateRestaurantDto: UpdateRestaurantDto): Restaurant {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex === -1) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    this.restaurants[restaurantIndex] = {
      ...this.restaurants[restaurantIndex],
      ...updateRestaurantDto,
    };
    return this.restaurants[restaurantIndex];
  }

  remove(id: string): void {
    const restaurantIndex = this.restaurants.findIndex(
      (restaurant) => restaurant.id === id,
    );
    if (restaurantIndex === -1) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }
    this.restaurants.splice(restaurantIndex, 1);
  }

  addRating(id: string, rating: number): Restaurant {
    const restaurant = this.findOne(id);
    if (restaurant.note === 0) {
      restaurant.note = rating;
    } else {
      throw new Error('La note a déjà été ajoutée à ce restaurant.');
    }
    return restaurant;
  }
}
