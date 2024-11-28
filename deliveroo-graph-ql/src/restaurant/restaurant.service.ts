import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant) private repo: Repository<Restaurant>,
  ) {}
  // create(createRestaurantInput: CreateRestaurantInput) {
  //   return 'This action adds a new restaurant';
  // }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  // update(id: number, updateRestaurantInput: UpdateRestaurantInput) {
  //   return `This action updates a #${id} restaurant`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} restaurant`;
  // }
}
