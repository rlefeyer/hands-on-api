import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Injectable()
export class RestaurantsService {
  restaurant = [];

  // Create a new restaurant
  create(createRestaurantDto: CreateRestaurantDto) {
    const newRestaurant = { ...createRestaurantDto };
    this.restaurant.push(newRestaurant);
    return Promise.resolve(newRestaurant);
  }

  // Retrieve all restaurants
  findAll() {
    return Promise.resolve(this.restaurant); 
  }

  // Retrieve a restaurant by ID
  findOne(id: number) {
    const restaurant = this.restaurant.find(restaurant => restaurant.id === id);
    return Promise.resolve(restaurant);
  }

  // Update a restaurant by ID
  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = this.restaurant.find(restaurant => restaurant.id === id);
    if (restaurant) {
      Object.assign(restaurant, updateRestaurantDto);
    }
    return Promise.resolve(restaurant);
  }

  // Delete a restaurant by ID
  remove(id: number) {
    this.restaurant = this.restaurant.filter(restaurant => restaurant.id !== id);
    return Promise.resolve();
  }
}
