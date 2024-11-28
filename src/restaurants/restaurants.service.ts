import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from "./entities/restaurant.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RestaurantsService {
  constructor(
      @InjectRepository(Restaurant)
      private readonly restaurantsRepository: Repository<Restaurant>
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const restaurant = new Restaurant();
    restaurant.name = createRestaurantDto.name;
    restaurant.description = createRestaurantDto.description;
    restaurant.address = createRestaurantDto.address;
    restaurant.menus = createRestaurantDto.menus;
    restaurant.note = createRestaurantDto.note;
    restaurant.schedules = createRestaurantDto.schedules;

    return await this.restaurantsRepository.save(restaurant);
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
